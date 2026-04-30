@echo off
echo Clearing .next cache...
if exist .next (
    rmdir /s /q .next
    echo Cache cleared!
) else (
    echo No cache to clear
)

echo Starting dev server...
npm run dev
