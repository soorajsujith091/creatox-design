<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CmsController extends Controller {
    public function login(Request $request) {
        $data = $request->validate(['email'=>'required|email|max:254', 'password'=>'required|string|max:256']);
        $user = User::where('email', strtolower($data['email']))->first();
        if (!$user || !Hash::check($data['password'], $user->password)) return response()->json(['error'=>'Email or password is incorrect.'],401);
        $token = bin2hex(random_bytes(32));
        DB::table('cms_tokens')->where('expires_at','<',now())->delete();
        DB::table('cms_tokens')->insert(['user_id'=>$user->id,'token_hash'=>hash('sha256',$token),'expires_at'=>now()->addHours(8),'created_at'=>now(),'updated_at'=>now()]);
        return response()->json(['token'=>$token]);
    }
    public function logout(Request $request) {
        DB::table('cms_tokens')->where('id',$request->attributes->get('cms_session')->id)->delete();
        return response()->json(['ok'=>true]);
    }
    public function articles() { return DB::table('cms_posts')->where('status','published')->orderByDesc('created_at')->get(); }
    public function article(string $slug) {
        $post = DB::table('cms_posts')->where('slug',$slug)->where('status','published')->first();
        abort_unless($post,404); return response()->json($post);
    }
    public function lead(Request $request) {
        if ($request->input('website')) return response()->json(['ok'=>true]);
        $data=$request->validate(['name'=>'required|string|max:120','email'=>'required|email|max:254','phone'=>'nullable|string|max:40','service'=>'nullable|string|max:500','message'=>'required|string|max:5000']);
        DB::table('cms_leads')->insert([...$data,'id'=>(string)Str::uuid(),'status'=>'new','created_at'=>now(),'updated_at'=>now()]);
        return response()->json(['ok'=>true],201);
    }
    public function index(string $resource) {
        abort_unless(in_array($resource,['posts','leads','media','images']),404);
        return DB::table('cms_'.$resource)->orderByDesc('created_at')->limit(500)->get();
    }
    public function save(Request $request, string $resource) {
        if ($resource==='media') {
            $request->validate(['file'=>'required|file|image|mimes:jpg,jpeg,png,webp,gif|max:5120']);
            $file=$request->file('file'); $path=$file->store('uploads','public');
            $record=['id'=>(string)Str::uuid(),'name'=>Str::limit(basename($file->getClientOriginalName()),200,''),'path'=>$path,'url'=>url('/storage/'.$path),'created_at'=>now(),'updated_at'=>now()];
            DB::table('cms_media')->insert($record); return response()->json([$record],201);
        }
        if ($resource==='leads') {
            $data=$request->validate(['id'=>'required|uuid|exists:cms_leads,id','status'=>'required|in:new,contacted,closed']);
            DB::table('cms_leads')->where('id',$data['id'])->update(['status'=>$data['status'],'updated_at'=>now()]); return response()->json(['ok'=>true]);
        }
        if ($resource==='images') {
            $data=$request->validate(['key'=>'required|string|exists:cms_images,key','url'=>'required|string|max:2000']);
            if (!DB::table('cms_media')->where('url',$data['url'])->exists()) return response()->json(['error'=>'Choose an uploaded library image.'],422);
            DB::table('cms_images')->where('key',$data['key'])->update(['url'=>$data['url'],'updated_at'=>now()]); return response()->json(['ok'=>true]);
        }
        abort_unless($resource==='posts',404);
        $data=$request->validate(['id'=>'nullable|uuid|exists:cms_posts,id','title'=>'required|string|max:200','slug'=>['required','regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/','max:180',Rule::unique('cms_posts','slug')->ignore($request->input('id'))],'excerpt'=>'nullable|string|max:500','body'=>'required|string|max:100000','image'=>'nullable|string|max:2000','category'=>'required|string|max:80','status'=>'required|in:draft,published']);
        if (!empty($data['image']) && !str_starts_with($data['image'],'/images/') && !DB::table('cms_media')->where('url',$data['image'])->exists()) return response()->json(['error'=>'Choose a library image or a website image path.'],422);
        $id=$data['id']??(string)Str::uuid(); unset($data['id']);
        if (DB::table('cms_posts')->where('id',$id)->exists()) DB::table('cms_posts')->where('id',$id)->update([...$data,'updated_at'=>now()]);
        else DB::table('cms_posts')->insert([...$data,'id'=>$id,'created_at'=>now(),'updated_at'=>now()]);
        return response()->json([DB::table('cms_posts')->where('id',$id)->first()]);
    }
}
