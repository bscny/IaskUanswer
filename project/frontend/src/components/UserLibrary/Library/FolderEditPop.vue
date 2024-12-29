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
                Want a new Quiz? Give New Quiz a Name:
            </p3>

            <input class="quiz-name-input" type="text" v-model="quizName" />

            <p4>
                Write your Quiz Description:
            </p4>

            <input class="quiz-description-input" type="text" v-model="quizDescription" />

            <button class="done-button" @click="EditionDone()">
                Save Changes
            </button>

            <button class="delete-button" @click="Delete()">
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
            folderName: this.folder.Folder_name,
            quizName: '',
            quizDescription: '',
        }
    },

    methods: {
        async EditionDone() {
            if ((this.folderName != "" && this.folderName != this.folder.Folder_name) || (this.quizName != "" && this.quizDescription != "")) {
                let newFolder;
                if (this.folderName != "" && this.folderName != this.folder.Folder_name) {
                    newFolder = {
                        Folder_id: this.folder.Folder_id,
                        Folder_name: this.folderName,
                        User_id: this.folder.User_id,
                        Parent_folder_id: this.folder.Parent_folder_id,

                        quizzes: this.folder.quizzes,
                        show: this.folder.show
                    }

                    this.$emit("Edited", newFolder);
                }

                if (this.quizName != "") {
                    // call backend API to create quiz under this folder
                    const quizData = {
                        Quiz_name: this.quizName,
                        Is_public: true,
                        Folder_id: this.folder.Folder_id,
                        Quiz_description: this.quizDescription,
                    };

                    this.$emit("CreateQuiz", quizData);
                }

            } else {
                this.$emit("Cancel");
            }
        },

        Delete() {
            const deletedFolderID = this.folder.Folder_id;
            // call backend API to delete folder

            this.$emit("Deleted", deletedFolderID);
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

    font-size: 2vw;
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

    font-size: 2vw;
}

.delete-button:hover {
    background-color: #c52323;
}

.cancel-button {
    position: absolute;

    right: 1px;
    bottom: 70px;

    padding: 1vh 1.2vw 1vh 1.2vw;
    background-color: #32a9be;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 2vw;
}

.cancel-button:hover {
    background-color: #12a3bd;
}

.window p1 {
    display: block;
    margin: 1vh 1vw;

    font-size: 2vw;
}

.window p2 {
    display: block;
    margin: 1vh 1vw;

    font-size: 2vw;
}

.folder-name-input {
    display: block;
    margin: 3vh 1vw;

    font-size: 2vw;
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

    font-size: 2vw;
}

.quiz-name-input {
    display: block;
    margin: 5vh 1vw 2vh 1vw;

    font-size: 2vw;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.quiz-name-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.window p4 {
    display: block;
    margin: 1vh 1vw 0 1vw;

    font-size: 2vw;
}

.quiz-description-input {
    display: block;
    margin: 5vh 1vw;

    font-size: 2vw;
    padding: 5px 10px;
    width: 50vw;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.quiz-description-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}
</style>