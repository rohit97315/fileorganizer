import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

const FILE_MAPPING = {
    Documents: ['.pdf', '.docx', '.txt', '.csv', '.xlsx', '.pptx'],
    Images: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
    Videos: ['.mp4', '.mkv', '.mov', '.avi'],
    Audio: ['.mp3', '.wav', '.flac'],
    Archives: ['.zip', '.tar', '.rar', '.7z'],
    Scripts: ['.js', '.mjs', '.html', '.css', '.py', '.cpp']
};

async function organizeFolder(targetPath) {
    try {
        const absolutePath = path.resolve(targetPath);

        if (!existsSync(absolutePath)) {
            throw new Error('Target folder does not exist');
        }

        console.log(`Organizing: ${absolutePath}`);

        const files = await fs.readdir(absolutePath);

        for (const filename of files) {
            if (filename.startsWith('.')) continue;

            if (Object.keys(FILE_MAPPING).includes(filename)) continue;
            const filePath = path.join(absolutePath, filename);
            const stats = await fs.lstat(filePath);
            if (stats.isDirectory()) continue;

            const ext = path.extname(filename).toLowerCase();
            let category = 'Others';
            for (const [folder, extensions] of Object.entries(FILE_MAPPING)) {
                if (extensions.includes(ext)) {
                    category = folder;
                    break;
                }
            }

            const categoryDir = path.join(absolutePath, category);
            if (!existsSync(categoryDir)) {
                await fs.mkdir(categoryDir, { recursive: true });
            }
            const newPath = path.join(categoryDir, filename);
            await fs.rename(filePath, newPath);
            console.log(`Moved: ${filename} → ${category}/`);
        }

        console.log('Organization Complete!');

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}
const userPath = process.argv[2];
if (!userPath) {
    console.error('Usage: node organizer.mjs <folder_path>');
    process.exit(1);
}

organizeFolder(userPath);
