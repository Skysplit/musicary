<template lang="html">
    <div :class="{ 'form-group': 1, 'has-error': hasError }">
        <slot name="label"></slot>

        <div class="col-md-9">
            <slot name="input"></slot>

            <p v-if="hasError" class="text-danger">
                {{ errors[0] }}
            </p>
        </div>
    </div>
</template>

<script>
module.exports = {
    computed: {
        hasError() {
            return this.errors && this.errors.length;
        }
    },
    props: {
        errors: {
            type: Array,
            default() {
                return []
            },
        },
    }
}
</script>
