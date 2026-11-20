$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$phpBinary = 'C:\xampp\php\php.exe'
$mysqlBinary = 'C:\xampp\mysql\bin\mysqld.exe'
if (!(Test-Path -LiteralPath $phpBinary)) { throw 'XAMPP PHP was not found.' }
if (!(Get-NetTCPConnection -LocalPort 3307 -State Listen -ErrorAction SilentlyContinue)) {
    Start-Process -FilePath $mysqlBinary -WindowStyle Hidden -ArgumentList '--no-defaults','--basedir=C:/xampp/mysql',"--datadir=$projectRoot/backend/storage/mysql",'--port=3307','--bind-address=127.0.0.1' -RedirectStandardOutput "$projectRoot/backend/storage/logs/mysql-out.log" -RedirectStandardError "$projectRoot/backend/storage/logs/mysql-error.log"
}
if (!(Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue)) {
    Start-Process -FilePath $phpBinary -WindowStyle Hidden -WorkingDirectory "$projectRoot/backend" -ArgumentList '-d','upload_max_filesize=6M','-d','post_max_size=8M','artisan','serve','--host=127.0.0.1','--port=8000' -RedirectStandardOutput "$projectRoot/backend/storage/logs/server-out.log" -RedirectStandardError "$projectRoot/backend/storage/logs/server-error.log"
}
Write-Output 'Laravel: http://127.0.0.1:8000 | CMS database: 127.0.0.1:3307'
Write-Output 'Website/admin: http://localhost:3000/admin (run npm.cmd run dev if not already running).'
