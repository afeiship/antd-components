/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-02-12 11:29:58
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-02-12 13:35:39
 */
import jswPresets from '@jswork/presets-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [jswPresets()],
  // corePlugins: {
  //   preflight: false, // 禁用 Tailwind 的 base 样式（即移除 base 层）
  // },
  theme: {
    extend: {},
  },
  plugins: [],
};
