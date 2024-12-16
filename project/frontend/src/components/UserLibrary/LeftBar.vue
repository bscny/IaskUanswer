<template>
    <nav class="leftbar">
        <button class="create-folder-button"  @click="CreateFolder()">
            Create Folder
        </button>

        <ul class="folders-flexbox" v-for="folder in folders" :key="folder.Folder_id">
            <button class="edit-folder-button"  @click="EditFolder(folder)">
                Edit Folder
            </button>
            
            <div class="folder"  @click="ToggleShow(folder)">
                {{ folder.Folder_name }}
            </div>

            <div v-if="folder.show">
                <ul v-for="quiz in folder.quizes" :key="quiz.Quiz_id"  @click="DisplayQuestions()">
                    <div class="quiz">
                        {{ quiz.Quiz_name }}
                    </div>
                </ul>
            </div>
        </ul>
    </nav>
</template>

<script>

export default{
    name: "LeftBar",
    components: {
    },

    props: {
        folders: Array,
    },

    data(){
        return{
        }
    },

    methods: {
        CreateFolder(){
            this.$emit("CreateFolder");
        },

        EditFolder(folder){
            this.$emit("EditFolder", folder);
        },

        ToggleShow(folder){
            folder.show = !folder.show;
        },

        DisplayQuestions(){
            this.$emit("DisplayQuestions");
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

    top: 8vh;
    left: 0;
    bottom: 0;
    width: 12vw;

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

    margin: 3.5vh 0 0 0;
    padding: 0.5vh 0.5vw;
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
    display: block;

    margin: 1vh 0 1vh 0;
    padding: 0 0 0 0;
    width: auto;
    font-size: 1.5vw;

    background-color: rgba(0, 0, 0, 0.137);
}

.folder:hover {
    background-color: #e0e0e0;
    cursor: pointer;
}

.quiz {
    display: block;

    margin: 1vh 0 1vh 0.5vw;
    width: auto;
    font-size: 1.2vw;
}

.quiz:hover {
    background-color: #9c9c9c;
    cursor: pointer;
}
</style>