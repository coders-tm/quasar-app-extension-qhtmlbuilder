<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="manage-templates gjs-one-bg gjs-two-color">
      <q-toolbar>
        <q-toolbar-title class="gjs-mdl-title">
          Manage templates
        </q-toolbar-title>
        <q-btn v-close-popup size="xs" flat round dense icon="close" />
      </q-toolbar>
      <div class="q-px-md">
        <q-tabs
          dense
          align="justify"
          active-color="primary"
          :breakpoint="0"
          v-model="tab"
          no-caps
        >
          <q-tab name="projects" label="My projects" />
          <q-tab name="templates" label="Templates" />
        </q-tabs>
        <q-separator dark />
      </div>
      <q-card-section>
        <q-tab-panels
          transition-next="fade"
          transition-prev="fade"
          class="bg-transparent"
          v-model="tab"
          animated
        >
          <q-tab-panel name="projects">
            <div class="templates row q-col-gutter-md">
              <div
                v-for="(item, index) in 3"
                :key="index"
                class="col-xs-12 col-sm-4"
              >
                <q-card class="my-card">
                  <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                  <q-card-section>
                    <div class="text-h6">Our Changing Planet</div>
                    <div class="text-subtitle2">by John Doe</div>
                  </q-card-section>
                  <q-card-section>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="templates">
            <div class="templates row q-col-gutter-md">
              <div
                v-for="(item, index) in templates"
                :key="index"
                class="col-xs-12 col-sm-4"
              >
                <q-card bordered class="template-card">
                  <q-img :ratio="16 / 9" :src="item.thumbnail" />
                  <q-separator />
                  <q-card-section>
                    <div class="text-subtitle2">{{ item.name }}</div>
                  </q-card-section>
                  <div class="absolute-center controller">
                    <q-btn
                      color="primary"
                      label="Select"
                      no-caps
                      @click="onOKClick(item)"
                    />
                  </div>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import templates from './templates'

const props = defineProps({
  editor: {}
})

const tab = ref('templates')

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

function onOKClick({ data }) {
  onDialogOK(data)
}
</script>

<style lang="sass">
.manage-templates
  width: 850px !important
  max-width: 95vw !important
  .q-tab-panel
    padding: 0
.template-card
  &:before
    display: none
    content: ""
    background: $grey-9
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 1
    opacity: .4
  .controller
    display: none
    z-index: 2
  &:hover
    &:before, .controller
      display: block
</style>
