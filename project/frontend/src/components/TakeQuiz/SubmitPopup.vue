<template>
    <div class="popup">
        <div class="popup-inner">
            <h2>Submit?</h2>
            <button @click="close()">
                Close
            </button>

            <button @click="ok()">
                OK
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "SubmitPopup",
    methods: {
        close() {
            this.$emit("submitOption", false)
        },
        ok() {
            this.$emit("submitOption", true)
        }
    }
}
</script>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-inner {

    border-radius: 10px;
    border-width: 10px;
    border-color: black;
    background: #a3a3a3;
    padding: 2vh 2vw 2vh 2vw;
}

.popup-inner > h2 {
    text-align: center;
}
.popup-inner > button {

    margin: 1vw;
    padding: 1vh 1vw 1vh 1vw;

}
</style>