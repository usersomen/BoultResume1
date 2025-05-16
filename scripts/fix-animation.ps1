# PowerShell script to fix the animation in ResumeCreator.tsx

$filePath = "c:\Users\Suvechya\Desktop\project\src\components\resume\ResumeCreator.tsx"
$content = Get-Content $filePath -Raw

# First, remove the problematic animation code
$animationStartPattern = "  // Add custom animation styles"
$animationEndPattern = "  }, []);"
$animationRegex = "(?s)$animationStartPattern.*?$animationEndPattern"
$content = $content -replace $animationRegex, ""

# Then add dashboard button styling fix
$dashboardButtonOld = 'className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors mr-2 border border-gray-700"'
$dashboardButtonNew = 'className="px-4 py-2 bg-[#4ECCA3] text-white text-sm rounded-lg hover:bg-[#45B08C] transition-colors mr-2"'
$content = $content -replace $dashboardButtonOld, $dashboardButtonNew

# Add animation class to AI-assist button without adding the animation code
$aiAssistButtonOld = 'className="px-3 py-1 bg-\[#4ECCA3\] text-white text-xs rounded-full flex items-center hover:bg-\[#45B08C\] transition-colors"'
$aiAssistButtonNew = 'className="px-3 py-1 bg-[#4ECCA3] text-white text-xs rounded-full flex items-center hover:bg-[#45B08C] transition-colors animate-pulse"'
$content = $content -replace $aiAssistButtonOld, $aiAssistButtonNew

# Write the updated content back to the file
Set-Content -Path $filePath -Value $content

Write-Host "Fixed animation issues by using Tailwind's built-in animate-pulse instead of custom animation."
