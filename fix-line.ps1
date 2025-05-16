$filePath = "c:\Users\Suvechya\Desktop\project\src\components\resume\ResumeCreator.tsx"
$content = Get-Content $filePath
$content[1234] = '                  className="px-3 py-1 bg-[#4ECCA3] text-white text-xs rounded-full flex items-center hover:bg-[#45B08C] transition-colors animate-pulse"'
$content | Set-Content $filePath
Write-Host "Fixed AI-assist button on line 1235."
