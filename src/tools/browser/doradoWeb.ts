import fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import type { Page } from 'playwright';
import { BrowserToolBase } from './base.js';
import { ToolContext, ToolResponse, createErrorResponse, createSuccessResponse } from '../common/types.js';

const defaultDownloadsPath = path.join(os.homedir(), 'Downloads');

/**
 * Base class for Dorado web tools.
 * Encapsulates shared Dorado URL helpers for browser-based tools.
 */
export abstract class DoradoWebTool extends BrowserToolBase {
  protected readonly doradoBaseUrl = 'https://data.bytedance.net/dorado';
  private screenshots = new Map<string, string>();

  /**
   * Build the runtime metric monitor URL for a Dorado task.
   */
  protected buildTaskMetricUrl(taskId: string, projectId: string): string {
    return `${this.doradoBaseUrl}/stream-task/detail?activeKey=runtimeMetric&project=${encodeURIComponent(projectId)}&taskId=${encodeURIComponent(taskId)}&subTab=metric_monitor`;
  }

  protected async captureScreenshot(page: Page, args: any, defaultName: string): Promise<string[]> {
    const screenshotOptions: any = {
      type: args.type || 'png',
      fullPage: args.fullPage !== false,
    };

    if (args.selector) {
      const element = await page.$(args.selector);
      if (!element) {
        throw new Error(`Element not found: ${args.selector}`);
      }
      screenshotOptions.clip = await element.boundingBox() ?? undefined;
      if (!screenshotOptions.clip) {
        throw new Error(`Unable to determine element bounds: ${args.selector}`);
      }
    }

    const screenshotName = args.name || defaultName;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${screenshotName}-${timestamp}.png`;
    const downloadsDir = args.downloadsDir || defaultDownloadsPath;

    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    const outputPath = path.join(downloadsDir, filename);
    screenshotOptions.path = outputPath;

    const screenshot = await page.screenshot(screenshotOptions);
    const messages = [`Screenshot saved to: ${path.relative(process.cwd(), outputPath)}`];

    if (args.storeBase64 !== false) {
      this.screenshots.set(screenshotName, screenshot.toString('base64'));
      this.server.notification({
        method: 'notifications/resources/list_changed',
      });
      messages.push(`Screenshot also stored in memory with name: '${screenshotName}'`);
    }

    return messages;
  }

  getScreenshots(): Map<string, string> {
    return this.screenshots;
  }
}

/**
 * Navigate to Dorado metric monitor and take a screenshot.
 */
export class DoradoMetricFlinkScreenshotTool extends DoradoWebTool {
  async execute(args: any, context: ToolContext): Promise<ToolResponse> {
    if (!args?.task_id) {
      return createErrorResponse('task_id is required');
    }

    args.project_id = args.project_id || 'cn_99';

    return this.safeExecute(context, async (page) => {
      const metricUrl = this.buildTaskMetricUrl(args.task_id, args.project_id);

      await page.goto(metricUrl, {
        timeout: args.timeout || 30000,
        waitUntil: args.waitUntil || 'networkidle',
      });

      const messages = [
        `Opened Dorado metric page: ${metricUrl}`,
        ...(await this.captureScreenshot(page, args, `dorado-metric-${args.task_id}`)),
      ];

      return createSuccessResponse(messages);
    });
  }
}
