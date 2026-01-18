Managing digital cluster of file and organising it is a common challenge for every laptop and pc users. Download folders and desktops often become filled with a chaotic mix of PDFs, images, scripts, and archives. This program automates the tedious process of manual sorting by scanning the target directory for loose files and categories it on the basis of their specific file extensions like moving .jpg to images folder , .pdf to document folder . This helps to clean up the workspace without user intervention and ensuring files are stored in logically named subdirectories.

Save the code as organizer.mjs ( .mjs is used as it utilises ES modules )
Now open terminal and run the prompt given below : 
   “node organizer.mjs <path to your file >”


The script takes a folder path from the terminal command (process.argv[2]).
It uses path.resolve() to create a full system path and checks if that folder actually exists using existsSync.
It reads the contents of the target folder and loops through every item.
It ignores hidden files (those starting with .) to avoid breaking system configurations.
It uses fs.lstat to check if an item is a file or a folder; it only processes files and skips existing subdirectories.
For each file, it extracts the extension (e.g., .png) and converts it to lowercase.
It compares this extension against the FILE_MAPPING object.
If a match is found (like .pdf in the Documents list), it assigns that category; otherwise, it defaults to a folder named "Others."The script checks if the destination category folder (e.g., /Images) exists. If not, it creates it using fs.mkdir with the recursive: true flag.
Finally, it uses fs.rename to move the file from the main directory into its new categorical sub-folder.
