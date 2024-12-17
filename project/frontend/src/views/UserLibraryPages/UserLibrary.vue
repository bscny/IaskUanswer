<template>
    <NavBar/>
    <LeftBar    :folders="folders"
                @CreateFolder="SetCreateFolder()"
                @EditFolder="SetEditFolder($event)"
                @DisplayQuestions="SetDisplay($event)" />

    <div v-if="canCreateFolder">
        <FolderCreatePop    :folders="folders"
                            @Cancel="CancelAction()"
                            @Created="FolderCreated($event)" />
    </div>

    <div v-if="canEditFolder">
        <FolderEditPop  :folder="curLookingFolder" 
                        @Cancel="CancelAction()" 
                        @Edited="FolderEdited($event)"
                        @Deleted="FolderDeleted($event)" />
    </div>

    <div class="display-area" v-if="curLookingQuiz != null">
        <DisplayQuestion    :quiz="curLookingQuiz"
                            :questions="curLookingQuestions"
                            @Editing="EditQuiz()" />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import LeftBar from "@/components/UserLibrary/LeftBar.vue";
import FolderCreatePop from "@/components/UserLibrary/FolderCreatePop.vue";
import FolderEditPop from "@/components/UserLibrary/FolderEditPop.vue";
import DisplayQuestion from "@/components/UserLibrary/DisplayQuestion.vue";

import { 
    useQuizStore,
    useQuestionsStore,
} from "@/stores/Userlibrary/QuizQuestionStore.js";

export default{
    name: "UserLibrary",
    components: {
        NavBar,
        LeftBar,
        FolderCreatePop,
        FolderEditPop,
        DisplayQuestion,
    },

    data(){
        return{
            // variables for folder actions
            canCreateFolder: false,
            canEditFolder: false,
            curLookingFolder: null,
            curLookingQuiz: null,
            curLookingQuestions: null,

            // pinia store share variables
            quizStore: useQuizStore(),
            questionsStore: useQuestionsStore(),

            // variables for datas from backend
            // fake data
            folders: [],
        };
    },

    methods: {
        SetCreateFolder(){
            this.canCreateFolder = true;
        },

        FolderCreated(newFolder){
            this.folders.push(newFolder);
            alert("Folder Created!");

            this.canCreateFolder = false;
        },

        SetEditFolder(folder){
            this.curLookingFolder = folder;

            this.canEditFolder = true;
        },

        FolderEdited(editedFolder){
            for(let i = 0; i < this.folders.length; i ++){
                if(this.folders[i].Folder_id == editedFolder.Folder_id){
                    this.folders[i] = editedFolder;
                }
            }
            alert("Change Saved!");

            this.canEditFolder = false;
        },

        FolderDeleted(deletedFolderID){
            for(let i = 0; i < this.folders.length; i ++){
                if(this.folders[i].Folder_id == deletedFolderID){
                    this.folders.splice(i, 1);
                }
            }
            alert("Deleted!!");

            this.canEditFolder = false;
        },

        async SetDisplay(quiz){
            this.curLookingQuiz = quiz;
            await this.FetchQuestion();
        },

        EditQuiz(){
            if(this.curLookingQuiz != null){
                // store quiz and corresponding question to store
                this.quizStore.SetQuiz(this.curLookingQuiz);
                this.questionsStore.SetQuestions(this.curLookingQuestions);
            }

            this.$router.push({
                name: 'EditQuiz',
            });
        },

        CancelAction(){
            this.canCreateFolder = false;
            this.canEditFolder = false;
        },

        async FetchQuestion(){
            // get all question based on quiz id from backend API
            // fake data for SO question:
            let questions = [
                {
                    SO_id: 4,
                    Q_number: 4,
                    Body: "test question 4",
                    Points: 30,
                    Answer: "i'm gay",
                    OptionA: "nonohuang is gay",
                    OptionB: "JX is gay",
                    OptionC: "benny is not gay",
                    Quiz_id: this.curLookingQuiz.Quiz_id
                },
                {
                    SO_id: 2,
                    Q_number: 2,
                    Body: "test question 2",
                    Points: 30,
                    Answer: "i'm loli con",
                    OptionA: "nonohuang is loli con",
                    OptionB: "JX is loli con",
                    OptionC: "benny is not loli con",
                    Quiz_id: this.curLookingQuiz.Quiz_id
                },
            ];

            // fake data for TF question:
            let questions1 = [
                {
                    SO_id: 3,
                    Q_number: 3,
                    Body: "test question 3",
                    Points: 30,
                    Answer: "i'm a bitch",
                    OptionA: "nonohuang is a bitch",
                    OptionB: "JX is a bitch",
                    OptionC: "benny is not a bitch",
                    Quiz_id: this.curLookingQuiz.Quiz_id
                },
                {
                    SO_id: 1,
                    Q_number: 1,
                    Body: "test question 1",
                    Points: 30,
                    Answer: "i'm obscene",
                    OptionA: "nonohuang is obscene",
                    OptionB: "JX is obscene",
                    OptionC: "benny is not obscene",
                    Quiz_id: this.curLookingQuiz.Quiz_id
                },
            ];

            // fill in blank... you are hard to deal with.....
            
            // re-structure each question
            questions = [...questions, ...questions1];
            questions.sort(function(a, b){
                return a.Q_number - b.Q_number;
            });
            
            this.curLookingQuestions = questions;
        },
    },

    computed: {

    },

    watch: {
        quizStore(){
            console.error(this.quizStore.quiz);
        }
    },

    created(){
        // get folders from given userId
        // fake data:
        this.folders = [
            {
                Folder_id: 1,
                Folder_name: "test folder 1",
                User_id: 1,
                Parent_folder_id: null,
            },
            {
                Folder_id: 2,
                Folder_name: "test folder 2",
                User_id: 1,
                Parent_folder_id: null
            },
            {
                Folder_id: 3,
                Folder_name: "test folder 3",
                User_id: 1,
                Parent_folder_id: null
            },
        ];

        // for each folder get quizes in it, get quizes from given folderId
        let i = 1;
        this.folders.forEach(async function (folder) {
            // actions for each elements in folders
            // get quizes belongs to each folder from backend API
            const quizes = [
                {
                    Quiz_id: i,
                    Quiz_name: `test quiz 1 in ${folder.Folder_name}`,
                    Quiz_description: "testetstetetetst",
                    Is_public: true,
                    Folder_id: folder.Folder_id
                },
                {
                    Quiz_id: i + 1,
                    Quiz_name: `test quiz 2 in ${folder.Folder_name}`,
                    Quiz_description: "test 22222",
                    Is_public: true,
                    Folder_id: folder.Folder_id
                },
            ];
            
            // append quizes and show indicator in folder object
            Object.assign(folder, {
                quizes: quizes,
                show: false
            });

            i += 2;
        });
    },

    mounted(){

    },

}
</script>

<style scoped>
.display-area {
    margin: 10vh 5vw 10vh 14vw;
}

</style>