# PowerShell script to fix the template string syntax in ResumeCreator.tsx

$filePath = "c:\Users\Suvechya\Desktop\project\src\components\resume\ResumeCreator.tsx"
$content = Get-Content $filePath -Raw

# Replace the problematic template string with correct syntax using backticks
$badSyntax = @"
  useEffect\(\) => {
    const style = document.createElement\('style'\);
    style.textContent = 
      @keyframes bounce-slow {
        0%, 100% {
          transform: translateY\(0\);
        }
        50% {
          transform: translateY\(-5px\);
        }
      }
      .animate-bounce-slow {
        animation: bounce-slow 2s infinite;
      }
    ;
"@

$goodSyntax = @"
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce-slow {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }
      .animate-bounce-slow {
        animation: bounce-slow 2s infinite;
      }
    `;
"@

$content = $content -replace [regex]::Escape("  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = 
      @keyframes bounce-slow {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }
      .animate-bounce-slow {
        animation: bounce-slow 2s infinite;
      }
    ;"), $goodSyntax

# Write the updated content back to the file
Set-Content -Path $filePath -Value $content

Write-Host "Animation syntax has been fixed successfully."
