<template>
    <div class="form-group">

        <label :for="id">
            {{ name }}
        </label>

        <span v-if="activated"
              class="ml-1">
            <transition name="icon" mode="out-in" appear>
            <v-icon :name="iconName" :class="iconClass" :key="iconName"/>
            </transition>
            <small class="errorText" :class="errorTextAnimationClass">{{ errorText }}</small>
        </span>

        <input type="text"
               class="form-control"
               :id="id"
               :value="value"
               @input="onInput">
    </div>

</template>

<script>
    import Icon from 'vue-awesome/components/Icon'
    import 'vue-awesome/icons/check-circle'
    import 'vue-awesome/icons/exclamation-circle'

    export default {
        components: {
            'v-icon': Icon
        },
        props:{
            name: String,
            value: String,
            pattern: {
                type: RegExp,
                default(){
                    return /.*/;
                }
            },
            errormessage: String
        },
        data(){
            return {
                activated: this.value !== '',
                valid: this.pattern.test(this.value)
            }
        },
        computed: {
            id(){
                let rand = Math.floor(Math.random() * 1000);
                let firstWordOfName= this.name.split(' ')[0];

                return firstWordOfName.charAt(0).toLowerCase() + firstWordOfName.substr(1) + rand;
            },
            validated(){
                return this.pattern.test(this.value);
            },
            iconClass(){
                return this.validated ? 'text-success' : 'text-danger';
            },
            iconName(){
                return this.validated ? 'check-circle' : 'exclamation-circle';
            },
            errorText(){
                return !this.validated ? this.errormessage : "...";
            },
            errorTextAnimationClass(){
                return !this.validated ? 'animated fadeIn text-danger' : 'animated fadeOut text-success';
            },

        },
        methods: {
            onInput(e){
                this.activated = true;
                this.$emit('changed', {
                    value: e.target.value
                });
            },
            emitValue(){
                this.$emit('validate', {
                    valid: this.validated
                });
            }
        },
        watch: {
            validated(){
                this.emitValue();
            }
        },
        created(){
            this.emitValue();
        }
    }
</script>

<style scoped>
    .errorText{
        margin-left: 10px;
        font-style: italic;
        font-size: 0.875rem;
    }
</style>