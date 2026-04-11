import { DoradoWebTool } from '../../../tools/browser/doradoWeb.js';
import type { ToolContext, ToolResponse } from '../../../tools/common/types.js';

class TestDoradoWebTool extends DoradoWebTool {
  async execute(_args: any, _context: ToolContext): Promise<ToolResponse> {
    return {
      content: [{
        type: 'text',
        text: this.buildTaskMetricUrl('12345', 'cn_99')
      }],
      isError: false
    };
  }

  public getMetricUrl(taskId: string, projectId: string): string {
    return this.buildTaskMetricUrl(taskId, projectId);
  }
}

describe('DoradoWebTool', () => {
  test('should build Dorado task metric URL', () => {
    const tool = new TestDoradoWebTool({});

    expect(tool.getMetricUrl('12345', 'cn_99')).toBe(
      'https://data.bytedance.net/dorado/stream-task/detail?activeKey=runtimeMetric&project=cn_99&taskId=12345&subTab=metric_monitor'
    );
  });

  test('should encode Dorado task metric URL parameters', () => {
    const tool = new TestDoradoWebTool({});

    expect(tool.getMetricUrl('task/123', 'cn 99')).toBe(
      'https://data.bytedance.net/dorado/stream-task/detail?activeKey=runtimeMetric&project=cn%2099&taskId=task%2F123&subTab=metric_monitor'
    );
  });
});

describe('DoradoMetricFlinkScreenshotTool', () => {
  test('is exported from browser index', async () => {
    const module = await import('../../../tools/browser/doradoWeb.js');
    expect(module.DoradoMetricFlinkScreenshotTool).toBeDefined();
  });
});
