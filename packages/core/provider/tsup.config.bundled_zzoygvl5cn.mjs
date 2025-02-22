// tsup.config.ts
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig({
  clean: true,
  target: "es2020",
  format: ["esm", "cjs"],
  entry: ["src/index.ts"],
  external: ["react", "react-dom", "react/jsx-runtime"],
  banner: {
    js: '"use client";'
  }
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL2hvbWUva3lsZS9wcm9qZWN0cy9Nb3Rpb25XaW5kVUkvTm92YVdhdmVVSS9wYWNrYWdlcy9jb3JlL3Byb3ZpZGVyL3RzdXAuY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9ob21lL2t5bGUvcHJvamVjdHMvTW90aW9uV2luZFVJL05vdmFXYXZlVUkvcGFja2FnZXMvY29yZS9wcm92aWRlclwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vaG9tZS9reWxlL3Byb2plY3RzL01vdGlvbldpbmRVSS9Ob3ZhV2F2ZVVJL3BhY2thZ2VzL2NvcmUvcHJvdmlkZXIvdHN1cC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd0c3VwJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgY2xlYW46IHRydWUsXG4gIHRhcmdldDogJ2VzMjAyMCcsXG4gIGZvcm1hdDogWydlc20nLCAnY2pzJ10sXG4gIGVudHJ5OiBbJ3NyYy9pbmRleC50cyddLFxuICBleHRlcm5hbDogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3QvanN4LXJ1bnRpbWUnXSxcbiAgYmFubmVyOiB7XG4gICAganM6ICdcInVzZSBjbGllbnRcIjsnLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9WLFNBQVMsb0JBQW9CO0FBRWpYLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLFFBQVEsQ0FBQyxPQUFPLEtBQUs7QUFBQSxFQUNyQixPQUFPLENBQUMsY0FBYztBQUFBLEVBQ3RCLFVBQVUsQ0FBQyxTQUFTLGFBQWEsbUJBQW1CO0FBQUEsRUFDcEQsUUFBUTtBQUFBLElBQ04sSUFBSTtBQUFBLEVBQ047QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
