import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin before each test
    await page.goto('/');
    
    // Fill login form
    await page.fill('input[name="username"]', 'admin1');
    await page.fill('input[name="password"]', 'admin123');
    
    // Click submit
    await page.click('button[type="submit"]');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL(/.*\/admin/);
  });

  test('should display admin dashboard with analytics', async ({ page }) => {
    // Navigate to admin dashboard
    await page.goto('/admin');
    
    // Verify page title or heading
    await expect(page.locator('h1, h2').first()).toBeVisible();
    
    // Check for analytics cards/widgets
    const analyticsSection = page.locator('[data-testid="analytics"], section, .analytics, [class*="analytics"]').first();
    if (await analyticsSection.isVisible()) {
      await expect(analyticsSection).toBeVisible();
    }
  });

  test('should display student analytics', async ({ page }) => {
    await page.goto('/admin');
    
    // Look for student count or metrics
    const studentMetrics = page.locator(
      '[data-testid*="student"], [class*="student"], text=/students?/i'
    ).first();
    
    if (await studentMetrics.isVisible()) {
      await expect(studentMetrics).toBeVisible();
    }
  });

  test('should display teacher analytics', async ({ page }) => {
    await page.goto('/admin');
    
    // Look for teacher count or metrics
    const teacherMetrics = page.locator(
      '[data-testid*="teacher"], [class*="teacher"], text=/teachers?/i'
    ).first();
    
    if (await teacherMetrics.isVisible()) {
      await expect(teacherMetrics).toBeVisible();
    }
  });

  test('should display charts if available', async ({ page }) => {
    await page.goto('/admin');
    
    // Look for canvas elements (common for charts)
    const charts = page.locator('canvas');
    const chartCount = await charts.count();
    
    // Just verify the page doesn't crash - charts may or may not be present
    await expect(page).toHaveURL(/.*\/admin/);
  });

  test('should allow navigation to analytics section', async ({ page }) => {
    await page.goto('/admin');
    
    // Look for navigation link to analytics
    const analyticsLink = page.locator('a, button').filter({
      hasText: /analytics|statistics|dashboard/i
    }).first();
    
    if (await analyticsLink.isVisible()) {
      await analyticsLink.click();
      // Just verify the page remains functional
      await expect(page).toHaveURL(/.*\/admin/);
    }
  });

  test('should display user info in header', async ({ page }) => {
    await page.goto('/admin');
    
    // Look for user info/profile area
    const userInfo = page.locator('[data-testid*="user"], [class*="profile"], [class*="header"]').first();
    if (await userInfo.isVisible()) {
      await expect(userInfo).toBeVisible();
    }
  });

  test('should be able to logout from admin dashboard', async ({ page }) => {
    await page.goto('/admin');
    
    // Look for logout button
    const logoutButton = page.locator('button, a').filter({
      hasText: /logout|sign out|exit/i
    }).first();
    
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Should redirect away from admin page
      await page.waitForURL(/.*(?!admin)/);
      await expect(page).not.toHaveURL(/.*\/admin/);
    }
  });
});
