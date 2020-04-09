<template>
    <Page>
        <ActionBar title="Groceries">
            <ActionItem text="Add" @tap="onAddTap"></ActionItem>
        </ActionBar>
        <GroceryList :items="itemsNotDeleted"/>
    </Page>

</template>

<script>
    import groceryData from "../grocery-data.json";
    import GroceryList from "./GroceryList";
    import AddItem from "./AddItem";
    import * as localstorage from "nativescript-localstorage";

    export default {
        components: {GroceryList, AddItem},
        data() {
            return {
                items: [],
            }
        },
        computed: {
            itemsNotDeleted() {
                localStorage.setItem("data", JSON.stringify(this.items));
                return this.items.filter((item) => {
                    return (!item.deleted)
                });
            },
        },
        methods: {
            onAddTap() {
                const newId = new Date().getTime();
                this.$showModal(AddItem, {props: {id: newId}}).then(newItem => {
                    if (newItem !== undefined) {
                        //ajout au localstorage
                        this.items.push(newItem);
                    }
                });
            },
        },
        created: function() {
            if (localStorage.getItem("data") !== null) {
                this.items = JSON.parse(localStorage.getItem("data"));
            } else {
                this.items = groceryData.groceryItems;
            }
        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 16;
        color: #333333;
    }
</style>
