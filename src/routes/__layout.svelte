<script>
  import '../tailwind.css';
</script>

<div class="dark antialiased text-gray-200 dark:text-gray-200 bg-white dark:bg-gray-900">
  <div class="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
    <div class="w-[108rem] flex-none flex justify-end">
      <picture><img src="/glow.png" alt="" class="w-[71.75rem] flex-none max-w-none dark:block" /></picture>
    </div>
  </div>
  <slot />
</div>
