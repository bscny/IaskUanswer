<template>
    <NavBar/>
    <LeftBar    :folders="folders"
                @CreateFolder="SetCreateFolder()"
                @EditFolder="SetEditFolder()"
                @DisplayQuestions="SetDisplay()" />

    <div v-if="canCreateFolder">
        <FolderCreatePop    :folders="folders"
                            @Cancel="CancelAction()"
                            @Created="FolderCreated($event)" />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import LeftBar from "@/components/UserLibrary/LeftBar.vue";
import FolderCreatePop from "@/components/UserLibrary/FolderCreatePop.vue";

export default{
    name: "UserLibrary",
    components: {
        NavBar,
        LeftBar,
        FolderCreatePop,
    },

    data(){
        return{
            // variables for folder actions
            canCreateFolder: false,
            canEditFolder: false,
            curLookingFolder: null,

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

        SetEditFolder(){
            this.canEditFolder = true;
        },

        ResetEditFolder(){
            this.canEditFolder = false;
        },

        SetDisplay(){

        },

        CancelAction(){
            this.canCreateFolder = false;
            this.canEditFolder = false;
        }
    },

    computed: {

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
            // actioms for each elements in folders
            // get quizes belongs to each folder
            const quizes = [
                {
                    Quiz_id: i,
                    Quiz_name: `test quiz 1 in ${folder.Folder_name}`,
                    is_public: true,
                    Folder_id: folder.Folder_id
                },
                {
                    Quiz_id: i + 1,
                    Quiz_name: `test quiz 2 in ${folder.Folder_name}`,
                    is_public: true,
                    Folder_id: folder.Folder_id
                },
            ];
            
            // append quizes and show indicator in folder class
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

</style>