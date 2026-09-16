import { describe, it, expect } from 'vitest';
import { renderBannerLines } from '../../src/cli/banner.js';

describe('Banner Renderer', () => {
  it('returns empty array when mode is off', () => {
    const lines = renderBannerLines('off', '1.6.0', 80);
    expect(lines).toHaveLength(0);
  });

  it('renders a compact clean banner at both terminal widths', () => {
    const mobile = renderBannerLines('clean', '1.6.0', 28);
    const desktop = renderBannerLines('clean', '1.6.0', 100);
    expect(mobile).toEqual(desktop);
    expect(mobile).toHaveLength(1);
    expect(mobile[0]).toContain('devx');
  });

  it('returns 1 compact line when mode is minimal', () => {
    const lines = renderBannerLines('minimal', '1.6.0', 80);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain('TERMUX·DEV');
    expect(lines[0]).toContain('v1.6.0');
  });

  it('returns full ASCII art lines when mode is full', () => {
    const desktopLines = renderBannerLines('full', '1.6.0', 80);
    expect(desktopLines.length).toBeGreaterThanOrEqual(4);
    expect(desktopLines[desktopLines.length - 1]).toContain('v1.6.0');

    const mobileLines = renderBannerLines('full', '1.6.0', 35);
    expect(mobileLines.length).toBeGreaterThanOrEqual(4);
    expect(mobileLines[mobileLines.length - 1]).toContain('v1.6.0');
  });
});
