<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class PageContentController extends Controller {
    private function path(Request $request): string {
        $value=$request->validate(['path'=>['required','string','max:255','regex:~^/(?:[a-zA-Z0-9_-]+/)*[a-zA-Z0-9_-]*$~']])['path'];
        return trim($value,'/')==='' ? '/' : '/'.trim($value,'/').'/';
    }
    public function published(Request $request) {
        $page=DB::table('cms_pages')->where('path',$this->path($request))->first();
        return response()->json(['content'=>$page ? json_decode($page->published??'{}',true) : new \stdClass]);
    }
    public function show(Request $request) {
        $page=DB::table('cms_pages')->where('path',$this->path($request))->first();
        return response()->json(['draft'=>$page ? json_decode($page->draft??'{}',true) : new \stdClass,'published'=>$page ? json_decode($page->published??'{}',true) : new \stdClass,'version'=>$page->version??0]);
    }
    public function save(Request $request) {
        $path=$this->path($request);
        $data=$request->validate(['version'=>'required|integer|min:0','action'=>['required',Rule::in(['draft','publish','restore'])],'content'=>'present|array|max:1500','content.*.kind'=>'required|in:text,image,link','content.*.value'=>'required|string|max:12000']);
        foreach ($data['content'] as $key=>$field) {
            if(!preg_match('/^[a-zA-Z0-9:_-]{1,160}$/',$key)) return response()->json(['error'=>'Invalid field identifier.'],422);
            if($field['kind']==='image' && !str_starts_with($field['value'],'/images/') && !DB::table('cms_media')->where('url',$field['value'])->exists()) return response()->json(['error'=>'Choose an uploaded image from the media library.'],422);
            if($field['kind']==='link' && !preg_match('~^(?:/(?!/)|https://|mailto:|tel:|#)~',$field['value'])) return response()->json(['error'=>'Use a website path, HTTPS URL, email, or phone link.'],422);
        }
        return DB::transaction(function() use($path,$data) {
            DB::table('cms_pages')->insertOrIgnore(['path'=>$path,'draft'=>'{}','published'=>'{}','version'=>0,'created_at'=>now(),'updated_at'=>now()]);
            $page=DB::table('cms_pages')->where('path',$path)->lockForUpdate()->first();
            if($page->version!==$data['version']) return response()->json(['error'=>'This page changed in another window. Reload the page before saving.'],409);
            $content=json_encode($data['content'],JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
            $changes=['draft'=>$data['action']==='restore'?$page->published:$content,'version'=>$page->version+1,'updated_at'=>now()];
            if($data['action']==='publish') $changes['published']=$content;
            DB::table('cms_pages')->where('id',$page->id)->update($changes);
            return response()->json(['ok'=>true,'version'=>$page->version+1]);
        });
    }
}
