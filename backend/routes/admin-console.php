<?php
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;

Artisan::command('cms:create-admin {email} {--local-access-file}', function () {
    $email=strtolower($this->argument('email'));
    if (!filter_var($email,FILTER_VALIDATE_EMAIL)) { $this->error('Enter a valid email.'); return 1; }
    if (User::where('email',$email)->exists()) { $this->error('That account already exists.'); return 1; }
    $password=$this->option('local-access-file') ? bin2hex(random_bytes(12)) : $this->secret('Admin password (minimum 12 characters)');
    if (strlen($password)<12) { $this->error('Use at least 12 characters.'); return 1; }
    User::create(['name'=>'Creatox Administrator','email'=>$email,'password'=>Hash::make($password)]);
    if ($this->option('local-access-file')) file_put_contents(base_path('../docs/LOCAL-CMS-ACCESS.txt'),"Local admin: http://localhost:3000/admin\nEmail: $email\nPassword: $password\n\nKeep this local file private. It is excluded from Git.\n");
    $this->info('Administrator created.');
});
