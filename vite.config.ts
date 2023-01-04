/*
 * @Author: linqibin
 * @Date: 2022-08-26 16:42:29
 * @LastEditors: linqibin
 * @LastEditTime: 2022-09-22 18:07:00
 * @Description: 
 * 
 * Copyright (c) 2022 by 研发中心/金地楼宇, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // modifyVars: {
        //   'primary-color': '#EA6732',
        // },
        // additionalData: '@import \'antd/dist/antd.variable.min.css\';'
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  // server: {
  //   hmr: {
  //     protocol: 'ws',
  //     host: 'localhost',
  //   },
  // },
  // esbuild: {
  //   // drop: ['console', 'debugger'],
  // },
})
