<script>
    import splitArray from "$lib/splitArray";
    let width;
    let height;
    export let data;
    $: columns = determineColumns(width);
    $: colData = splitArray(data, columns);

    let cssGrid = "grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12";
    

    export let determineColumns = (blockWidth) => {
      if (blockWidth < 640) {
        return 2;
      } else if (blockWidth > 640 && blockWidth < 768) {
        return 2;
      } else if (blockWidth > 768 && blockWidth < 1024) {
        return 3;
      } else if (blockWidth > 1024 && blockWidth < 1280) {
        return 3;
      } else if (blockWidth > 1280 && blockWidth < 1536) {
        return 4;
      } else {
        return 4;
      }
    }

</script>

<div class={"grid grid-cols-" + columns + " gap-4"} bind:clientHeight={height} bind:clientWidth={width}>
    <slot columns={colData} />
</div>