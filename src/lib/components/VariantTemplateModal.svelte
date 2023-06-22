<script>
    import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    let tabSet = 0;
</script>
<div class="card variant-glass rounded-token w-modal p-8 flex flex-col gap-4">
    <h1 class="text-3xl font-bold">Variant Templates</h1>
    <TabGroup>
        <Tab bind:group={tabSet} name="tab1" value={0}>Select A Template</Tab>
        <Tab bind:group={tabSet} name="tab2" value={1}>Create A New Template</Tab>
    </TabGroup>
</div>