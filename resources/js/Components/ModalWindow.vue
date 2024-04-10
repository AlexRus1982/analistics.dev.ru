<template>
    <!-- <div v-if="show" class="modal-shadow" @click.self="closeModal"> -->
    <div v-if="show" class="modal-shadow">
        <div class="modal">
            
            <div class="modal_header">
                <slot name="title">
                    <h3 class="modal-title">Заголовок</h3>
                </slot>
                <div class="modal-close" @click="closeModal">&#10006;</div>
            </div>
            
            <div class="modal_content">
                <slot name="body">
                    body
                </slot>
            </div>

            <div class="modal_footer">
                <slot name="footer">
                    <button class="modal-footer__button" @click="closeModal">
                        Ок
                    </button>
                </slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

    .modal-shadow {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10000;
        min-height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    }
 
    .modal {
        background: #fff;
        border-radius: 8px;
        min-width: 420px;
        max-width: 480px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        &_header {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1px solid #CCC;
            padding: 0px 10px 0px 10px;
        }

        &_content {
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 10px 10px 10px 10px;

            div {
                cursor: pointer;
                padding: 5px;
                transition: 0.3s;

                &:hover {
                    background-color: #59F;
                    color: #FFF;
                }
            }
        }

        &_footer {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-top: 1px solid #CCC;
            padding: 10px 10px 10px 10px;
        }
 
        &-close {
            margin-left: auto;
            border-radius: 50%;
            color: #fff;
            background: #2a4cc7;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
 
        &-title {
            color: #0971c7;
        }
 
        &-content {
            margin-bottom: 20px
        }
 
        &-footer {
            &__button {
                cursor: pointer;
                margin-left: auto;
                background-color: #0971c7;
                color: #fff;
                border: none;
                text-align: center;
                padding: 8px;
                font-size: 17px;
                font-weight: 500;
                border-radius: 8px;
                min-width: 150px;
            }
        }
    }
</style>

<script>
    export default {
        name: "ModalWindow",

        data: function () {
            return {
                show: false
            }
        },

        setup(){
            const vueStore = window._vueStore;

            return {
                vueStore,
            }
        },

        methods: {
            showModal: function () {
                this.show = true
            },

            closeModal: function () {
                this.show = false
            }
        }
    }
</script>