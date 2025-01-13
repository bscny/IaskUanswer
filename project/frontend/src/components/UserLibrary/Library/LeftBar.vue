<template>
    <nav class="leftbar">
        <button class="create-folder-button" @click="CreateFolder()">
            Create Folder
        </button>

        <ul class="folders-flexbox" v-for="folder in folders" :key="folder.Folder_id">


            <div class="folder">


                <div class="folder-text" @click="ToggleShow(folder)">

                    <span v-if="folder.show">
                        ▾
                    </span>
                    <span v-else>
                        ▸
                    </span>
                    <span class="folder-name">
                        {{ folder.Folder_name }} 

                    </span>
                </div>

                <button class="edit-folder-button" @click="EditFolder(folder)">
                    Edit
                </button>
            </div>

            <div v-if="folder.show">
                <ul v-for="quiz in folder.quizzes" :key="quiz.Quiz_id" @click="DisplayQuestions(quiz)">
                    <div class="quiz">
                        {{ quiz.Quiz_name }}
                    </div>
                </ul>
            </div>
        </ul>
    </nav>
</template>

<script>

export default {
    name: "LeftBar",
    components: {
    },

    props: {
        folders: Array,
    },

    data() {
        return {
        }
    },

    methods: {

        CreateFolder() {
            this.$emit("CreateFolder");
        },

        EditFolder(folder) {
            this.$emit("EditFolder", folder);
        },

        ToggleShow(folder) {
            folder.show = !folder.show;
        },

        DisplayQuestions(quiz) {
            this.$emit("DisplayQuestions", quiz);
        }
    },

    computed: {

    },

}
</script>

<style scoped>
.leftbar {
    position: absolute;
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: start;

    top: 7.8vh;
    left: 0;
    /* bottom: 0; */
    width: 13vw;
    border-radius: 5px;

    background-color: rgb(160, 148, 148);
}


.create-folder-button {
    display: block;

    margin: 2.5vh 0 0 0;
    padding: 0.8vh 1vw 0.8vh 1vw;
    font-size: 1vw;
    background-color: rgb(177, 187, 240);
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 5px;

    cursor: pointer;
    transition: background-color 0.3s;
}

.create-folder-button:hover {
    background-color: #ccc7eb;
}

.folders-flexbox {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: start;

    margin: 0;
    padding: 0;
}

.edit-folder-button {
    display: block;

    margin: 0 0 0 0.75vw;
    padding: 0.05vh 0.05vw;
    background-color: #db5d67;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1vw;

    cursor: pointer;
    transition: background-color 0.3s;
}

.edit-folder-button:hover {
    background-color: #e2647f;
}

.folder {
    min-width: 12vw;
    display: flex;
    justify-content: space-between;
    padding: 0 0 0 0;
    margin-top: 1vh;
}

.folder-text {
    display: flex;
    margin: 1vh 0 1vh 0;
    width: 10vw;

    text-align: center;
    font-size: 1vw;

    background-color: rgba(0, 0, 0, 0.137);
}

.folder-name {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 0.05vw;
}
.folder-text:hover {
    background-color: #e0e0e0;
    cursor: pointer;
}

.quiz {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.137);
    margin: 1vh 0 1vh 1vw;
    width: 10vw;
    font-size: 1.2vw;
}

.quiz:hover {
    background-color: #e0e0e0;
    cursor: pointer;
}
</style>