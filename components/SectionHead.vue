<template>
    <header class="section-head">
        <div class="section-badge">
            <img :src="icon" alt="" />
        </div>
        <h2 class="section-heading">{{ title }}</h2>
    </header>
</template>

<script setup>
const { icon, title } = defineProps({
    icon: { required: true, type: String },
    title: { required: true, type: String },
});
</script>

<style scoped>
.section-head {
    display: flex;
    align-items: flex-start;
    gap: 22px;
    margin: 56px 0 28px;
}

.section-badge {
    flex: 0 0 auto;
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    box-shadow: var(--shadow-elevated);
}

.section-badge img {
    width: 56px;
    height: 56px;
}

.section-heading {
    letter-spacing: -0.015em;
    line-height: 1.3;
    font-size: 1.55em;
    font-weight: 700;
    text-align: left;
    margin: 0;
    padding-top: 0;
    flex: 1;
}

@media (max-width: 640px) {
    .section-head {
        flex-direction: column;
        align-items: flex-start;
        gap: 18px;
    }

    .section-badge {
        width: 64px;
        height: 64px;
        border-radius: 16px;
    }

    .section-badge img {
        width: 44px;
        height: 44px;
    }
}
</style>
