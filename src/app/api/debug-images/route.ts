import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Check if public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    const publicExists = fs.existsSync(publicDir);

    // Check if images directory exists
    const imagesDir = path.join(publicDir, 'images');
    const imagesExists = fs.existsSync(imagesDir);

    // Check profile directory
    const profileDir = path.join(imagesDir, 'profile');
    const profileExists = fs.existsSync(profileDir);

    // Check specific image
    const profileImagePath = path.join(profileDir, 'DSC07056-2.jpg');
    const profileImageExists = fs.existsSync(profileImagePath);

    // List directories in public
    let publicDirs: string[] = [];
    try {
      if (publicExists) {
        publicDirs = fs.readdirSync(publicDir);
      }
    } catch (error) {
      console.error('Error reading public dir:', error);
    }

    // List directories in images
    let imagesDirs: string[] = [];
    try {
      if (imagesExists) {
        imagesDirs = fs.readdirSync(imagesDir);
      }
    } catch (error) {
      console.error('Error reading images dir:', error);
    }

    // List files in profile dir
    let profileFiles: string[] = [];
    try {
      if (profileExists) {
        profileFiles = fs.readdirSync(profileDir);
      }
    } catch (error) {
      console.error('Error reading profile dir:', error);
    }

    return NextResponse.json({
      cwd: process.cwd(),
      publicExists,
      imagesExists,
      profileExists,
      profileImageExists,
      profileImagePath,
      publicDirs,
      imagesDirs,
      profileFiles
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { error: 'Failed to debug images', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 