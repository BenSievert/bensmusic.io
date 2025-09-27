<script lang="ts">
    let {onclick, text } = $props();
</script>
<button class="bg-primary-dark hover:bg-primary rounded-md px-3 py-1 text-white m-1 cursor-pointer" onclick={onclick}>
    {text}
</button>