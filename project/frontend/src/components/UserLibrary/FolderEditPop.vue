<template>
    <div class="BG">
        <div class="window">
            <p1>
                Current Folder: {{ folder.Folder_name }}
            </p1>

            <p2>
                give a new name if you want to:
            </p2>

            <input class="folder-name-input" type="text" v-model="folderName" />

            <p3>
                Want a new set? Give New Set a Name:
            </p3>

            <input class="set-name-input" type="text" v-model="quizName" />

            <button class="done-button" @click="EditionDone(1)">
                Save Changes
            </button>

            <button class="delete-button" @click="EditionDone(0)">
                Delete This Folder
            </button>

            <button class="cancel-button" @click="Cancel()">
                Cancel
            </button>

        </div>
    </div>
</template>

<script>

export default {
    name: 'FolderEditPop',
    components: {},

    props: {
        folder: Object,
    },

    data() {
        return {
            folderName: '',
            quizName: '',
        }
    },

    methods: {
        EditionDone(mode) {
            if (mode == 1) {
                // edit mode
                // call backend API to update folder

                // call backend API to retrieve the record of updated folder
                // fake data:
                const newRecord = {
                    Folder_id: this.folder.Folder_id,
                    Folder_name: this.folderName,
                    User_id: this.folder.User_id,
                    Parent_folder_id: this.folder.Parent_folder_id
                }

                if (this.quizName != "") {
                    // call backend API to create quiz under this folder
                    // fake data:
                    const quiz = {
                        Quiz_id: 10,
                        Quiz_name: this.quizName,
                        is_public: true,
                        Folder_id: this.folder.Folder_id
                    }

                    // append quizes and show indicator in folder object
                    if(this.folder.quizes == null){
                        // to make sure to treat this.folder.quizes as an array
                        this.folder.quizes = [];
                    }
                    
                    this.folder.quizes.push(quiz);
                    Object.assign(newRecord, {
                        quizes: this.folder.quizes,
                        show: false
                    });
                }else{
                    // append empty quiz to folder object
                    Object.assign(newRecord, {
                        quizes: null,
                        show: false
                    });
                }

                this.$emit("Edited", newRecord);
            } else {
                // delete mode
                const deletedFolderID = this.folder.Folder_id;
                // call backend API to delete folder

                this.$emit("Deleted", deletedFolderID);
            }
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
    bottom: 10vh;
    left: 20vw;

    background-color: rgb(43, 22, 77);
    color: white;

    z-index: 101;
}

.done-button {
    position: absolute;

    right: 1px;
    bottom: 1px;

    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 2.5vw;
}

.done-button:hover {
    background-color: #288d2e;
}

.delete-button {
    position: absolute;

    left: 1px;
    bottom: 1px;

    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #d82d2d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 2.5vw;
}

.delete-button:hover {
    background-color: #c52323;
}

.cancel-button {
    position: absolute;

    left: 1px;
    bottom: 70px;

    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #32a9be;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 2.5vw;
}

.cancel-button:hover {
    background-color: #12a3bd;
}

.window p1 {
    display: block;
    margin: 1vh 1vw;

    font-size: 2.5vw;
}

.window p2 {
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

.window p3 {
    display: block;
    margin: 10vh 1vw 0 1vw;

    font-size: 2.5vw;
}

.set-name-input {
    display: block;
    margin: 5vh 1vw;

    font-size: 2.5vw;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.set-name-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}
</style>