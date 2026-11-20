<?php
namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\CmsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CmsTest extends TestCase {
    use RefreshDatabase;
    private function token(): string {
        User::create(['name'=>'Test Admin','email'=>'admin@example.test','password'=>Hash::make('a-long-test-password')]);
        return $this->postJson('/api/login',['email'=>'admin@example.test','password'=>'a-long-test-password'])->assertOk()->json('token');
    }
    public function test_admin_requires_authentication_and_logout_revokes_token(): void {
        $this->getJson('/api/admin/leads')->assertUnauthorized();
        $token=$this->token();
        $this->withToken($token)->getJson('/api/session')->assertOk();
        $this->withToken($token)->postJson('/api/logout')->assertOk();
        $this->withToken($token)->getJson('/api/session')->assertUnauthorized();
    }
    public function test_lead_validation_capture_and_status_update(): void {
        $this->postJson('/api/leads',['email'=>'invalid'])->assertUnprocessable();
        $this->postJson('/api/leads',['name'=>'Website visitor','email'=>'visitor@example.test','message'=>'Please contact me about branding.'])->assertCreated();
        $token=$this->token();
        $id=$this->withToken($token)->getJson('/api/admin/leads')->assertJsonCount(1)->json('0.id');
        $this->withToken($token)->postJson('/api/admin/leads',['id'=>$id,'status'=>'contacted'])->assertOk();
        $this->assertDatabaseHas('cms_leads',['id'=>$id,'status'=>'contacted']);
    }
    public function test_drafts_stay_private_and_published_articles_are_public(): void {
        $token=$this->token();
        $post=['title'=>'New story','slug'=>'new-story','body'=>'An original studio story.','excerpt'=>'An introduction.','category'=>'Branding','status'=>'draft','image'=>''];
        $id=$this->withToken($token)->postJson('/api/admin/posts',$post)->assertOk()->json('0.id');
        $this->getJson('/api/articles/new-story')->assertNotFound();
        $this->withToken($token)->postJson('/api/admin/posts',[...$post,'id'=>$id,'status'=>'published'])->assertOk();
        $this->getJson('/api/articles/new-story')->assertOk()->assertJsonPath('title','New story');
        $this->withToken($token)->postJson('/api/admin/posts',[...$post,'slug'=>'new-story'])->assertUnprocessable();
    }
    public function test_image_upload_validation_and_website_assignment(): void {
        Storage::fake('public'); $this->seed(CmsSeeder::class); $token=$this->token();
        $this->withToken($token)->post('/api/admin/media',['file'=>UploadedFile::fake()->create('script.php',1,'text/plain')],['Accept'=>'application/json'])->assertUnprocessable();
        $upload=$this->withToken($token)->post('/api/admin/media',['file'=>UploadedFile::fake()->image('cover.png')],['Accept'=>'application/json'])->assertCreated();
        $url=$upload->json('0.url');
        $this->withToken($token)->postJson('/api/admin/images',['key'=>'footer_banner','url'=>$url])->assertOk();
        $this->getJson('/api/images')->assertJsonPath('footer_banner',$url);
    }
    public function test_page_drafts_are_private_and_publish_uses_optimistic_locking(): void {
        $this->getJson('/api/admin/page-content?path=/about-us/')->assertUnauthorized();
        $token=$this->token();
        $content=['story_title_abc'=>['kind'=>'text','value'=>'A new studio story']];
        $this->withToken($token)->postJson('/api/admin/page-content',['path'=>'/about-us/','version'=>0,'action'=>'draft','content'=>$content])->assertOk()->assertJsonPath('version',1);
        $public=$this->getJson('/api/page-content?path=/about-us/')->assertOk()->json('content');
        $this->assertEmpty($public);
        $this->withToken($token)->getJson('/api/admin/page-content?path=/about-us/')->assertJsonPath('draft.story_title_abc.value','A new studio story');
        $this->withToken($token)->postJson('/api/admin/page-content',['path'=>'/about-us/','version'=>0,'action'=>'publish','content'=>$content])->assertConflict();
        $this->withToken($token)->postJson('/api/admin/page-content',['path'=>'/about-us/','version'=>1,'action'=>'publish','content'=>$content])->assertOk();
        $this->getJson('/api/page-content?path=/about-us/')->assertJsonPath('content.story_title_abc.value','A new studio story');
        $this->getJson('/api/page-content?path=/services/')->assertJsonPath('content',[]);
    }
    public function test_page_fields_reject_unsafe_links_and_unknown_uploads(): void {
        $token=$this->token();
        foreach([['kind'=>'link','value'=>'javascript:alert(1)'],['kind'=>'image','value'=>'https://untrusted.test/image.png']] as $field) {
            $this->withToken($token)->postJson('/api/admin/page-content',['path'=>'/','version'=>0,'action'=>'draft','content'=>['field_abc'=>$field]])->assertUnprocessable();
        }
    }
}
