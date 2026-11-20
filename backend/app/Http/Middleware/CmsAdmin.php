<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CmsAdmin {
    public function handle(Request $request, Closure $next) {
        $token = $request->bearerToken();
        $session = $token ? DB::table('cms_tokens')->where('token_hash', hash('sha256', $token))->where('expires_at', '>', now())->first() : null;
        if (!$session) return response()->json(['error'=>'Please sign in again.'], 401);
        $request->attributes->set('cms_session', $session);
        return $next($request);
    }
}
