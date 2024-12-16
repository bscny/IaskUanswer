<template>
    <div class="BG">
        <div class="window">
            <button class="done-button" @click="CreationDone()">
                Crate Folder
            </button>

            <button class="cancel-button" @click="Cancel()">
                Cancel
            </button>

            <p>
                Give New Folder a Name
            </p>

            <input class="folder-name-input" type="text" v-model="folderName" @keydown.enter="CreationDone()" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'FolderCreatePop',
    components: {},

    data() {
        return {
            folderName: '',

            // fake data
            userID: 1,
        }
    },

    methods: {
        CreationDone() {
            // call backend API to insert

            // call backend API to retrieve the newly created record
            // fake data:
            let newRecord = {
                Folder_id: 10,
                Folder_name: this.folderName,
                User_id: this.userID,
                Parent_folder_id: null,
            }

            // append empty quiz to folder object
            Object.assign(newRecord, {
                quizes: null,
                show: false
            });

            this.$emit("Created", newRecord);
        },

        Cancel() {
            this.$emit("Cancel");
        }
    }
}
</script>

<style scoped>
.BG {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(255, 255, 255, 0.301);

    z-index: 100;
}

.window {
    position: fixed;
    top: 10vh;
    right: 20vw;
    bottom: 60vh;
    left: 20vw;

    background-color: rgb(43, 22, 77);
    color: white;

    z-index: 101;
}

.done-button {
    position: absolute;

    right: 5px;
    bottom: 5px;

    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 30px;
}

.done-button:hover {
    background-color: #288d2e;
}

.cancel-button {
    position: absolute;

    left: 5px;
    bottom: 5px;

    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #32a9be;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 30px;
}

.cancel-button:hover {
    background-color: #12a3bd;
}

.window p {
    display: block;

    margin: 1vh 1vw;

    font-size: 2.5vw;
}

.folder-name-input {
    display: block;
    margin: 3vh 1vw;

    font-size: 2.5vw;
    padding: 0.5vh 0.4vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.folder-name-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}
</style>