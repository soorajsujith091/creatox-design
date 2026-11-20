<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CmsSeeder extends Seeder {
    public function run(): void {
        $slots=[
            'footer_banner'=>['Footer banner','/images/creatox-immersive-brand-studio-hero.png'],
            'our_story'=>['Our Story artwork','/images/creatox-our-story.png'],
            'service_branding-design'=>['Branding & Design cover','/images/download%20(12).jpeg'],
            'service_social-media'=>['Social Media cover','/images/Creatoxx.jpeg'],
            'service_web-design'=>['Web Design cover','/images/expertise/web-immersive.jpeg'],
            'service_ads-campaigns'=>['Ads & Campaigns cover','/images/expertise/campaign-momentum.jpeg'],
            'service_productions'=>['Productions cover','/images/expertise/productions-floating-red.png'],
            'service_ecommerce'=>['E-commerce cover','/images/creatox,ecommerce.jpeg'],
        ];
        foreach($slots as $key=>[$label,$url]) DB::table('cms_images')->insertOrIgnore(['key'=>$key,'label'=>$label,'url'=>$url,'created_at'=>now(),'updated_at'=>now()]);
    }
}
