import { test, expect } from '@playwright/test';
import path from 'node:path';
import { UploadPage } from '../pages/UploadPage';

const sampleFile = path.join(__dirname, '..', 'fixtures', 'sample-upload.txt');

test.describe('File Upload — /upload', () => {
  test('TC-UPLOAD-01 (positive): a selected file is uploaded successfully', async ({ page }) => {
    const upload = new UploadPage(page);
    await upload.open();
    await upload.uploadFile(sampleFile);

    await expect(upload.successHeading).toBeVisible();
    await expect(upload.uploadedHeader).toHaveText('File Uploaded!');
    await expect(upload.uploadedFiles).toContainText('sample-upload.txt');
  });

  test('TC-UPLOAD-02 (negative): submitting with no file does not reach the success page', async ({ page }) => {
    const upload = new UploadPage(page);
    await upload.open();
    await upload.submitWithoutFile();

    await expect(upload.successHeading).toHaveCount(0);
  });
});
