<template>
  <q-page>
    <q-drawer
      side="left"
      :width="200"
      :breakpoint="500"
      :model-value="true"
      class="gjs-panel-left gjs-one-bg gjs-two-color"
    >
      <q-item style="height: 40px" dense>
        <q-item-section>
          <q-item-label><q-icon name="newspaper" /> Pages</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            <q-btn
              dense
              round
              flat
              size="sm"
              icon="add"
              @click="editor.addPage()"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-scroll-area style="height: 200px">
        <q-list class="gjs-pages" dense>
          <q-item
            @click.stop="editor.selectPage(item.id)"
            v-for="(item, index) in pages"
            :key="index"
            clickable
            v-ripple
            :active="editor.isSelected(item)"
          >
            <q-item-section>
              <q-item-label>
                <q-input
                  dense
                  borderless
                  v-if="rename.id == item.id"
                  v-model="originalName"
                  debounce="500"
                  @update:model-value="onRenameDone"
                />
                <template v-else>
                  {{ item.get('name') || item.id }}
                </template>
              </q-item-label>
            </q-item-section>
            <q-item-section v-if="editor.isSelected(item)" side>
              <q-item-label>
                <q-btn
                  class="gjs-menu"
                  @click.stop
                  round
                  flat
                  dense
                  size="sm"
                  icon="more_vert"
                >
                  <q-menu class="gjs-one-bg gjs-two-color">
                    <q-list bordered dense style="min-width: 100px">
                      <q-item
                        @click.stop="onRename(item)"
                        clickable
                        v-close-popup
                      >
                        <q-item-section>Rename</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        @click.stop="editor.removePage(item.id)"
                        clickable
                        v-close-popup
                        v-show="canDelete"
                      >
                        <q-item-section>Remove</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-separator />
      <div class="panel-left gjs-one-bg gjs-two-color">
        <q-item dense>
          <q-item-section>
            <q-item-label> <q-icon name="layers" /> Layers </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <div class="layers-container"></div>
      </div>
    </q-drawer>

    <QHtmlBuilder v-model:pages="pages" ref="editor" :config="config" />
  </q-page>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'

const editor = ref(null)
const pages = ref([])
const rename = ref({})
const originalName = ref(null)

const onRename = (page) => {
  rename.value = page
  originalName.value = page.get('name')
}

const onRenameDone = () => {
  editor.value.renamePage(rename.value.id, originalName.value)
  rename.value = {}
}

const loadData = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/projects/${id}`)
      .then(({ data }) => {
        resolve(data.data)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

const storeData = (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`http://localhost:3000/projects/${id}`, data)
      .then(({ data }) => {
        resolve(data.data)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

const config = {
  height: 'calc(100vh - 50px)',
  layerManager: {
    appendTo: '.layers-container'
  },
  storageManager: false,
  // CSS or a JSON of styles
  style: '.my-el { color: red }',
  // HTML string or a JSON of components
  components: '<div class="my-el">Hello world!</div>',
  pageManager: {
    pages: [
      {
        id: 'home',
        name: 'Home',
        component:
          '<body id="i4km0b"><div id="i8yj1g" class="gjs-grid-row"><div id="i2vft4" class="gjs-grid-column"><div id="istg48" class="gjs-grid-row"><div id="itezp5" class="gjs-grid-column"><a href="/" id="ih5avt" class="gjs-link-box"><img src="https://via.placeholder.com/100x100" id="imlned"></a></div><div id="isza67" class="gjs-grid-column"><div id="ivyz6b" class="gjs-grid-row"><div id="ivpq4g" class="gjs-grid-column"><a id="igkn1i" class="gjs-link">About</a></div><div id="igrp1f" class="gjs-grid-column"><a id="ixcgfo" class="gjs-link">Features</a></div><div id="iyvo2d" class="gjs-grid-column"><a href="" id="i7xjkp" class="gjs-link">Pricing</a></div></div></div><div id="i4s0bs" class="gjs-grid-column"><a id="i9qhbl" class="gjs-link">Button</a></div></div></div></div><div id="i78pnf" class="gjs-grid-row"><div id="icju9g" class="gjs-grid-column"><h1 id="idg5og" class="gjs-heading">Insert Hero text here</h1><div id="ivd6pa" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div><a id="ihx6d2" class="gjs-link">Button</a><img src="https://via.placeholder.com/1000x700" id="i65j6c"></div></div><div id="io7c67" class="gjs-grid-row"><div id="i4aljr" class="gjs-grid-column"><div id="i7wzqf" class="gjs-grid-row"><div id="iouxss" class="gjs-grid-column"><h2 id="i434c7" class="gjs-heading">Feature One text</h2><div id="i6387t" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div><a id="iyr17n" class="gjs-link">Button</a></div><div class="gjs-grid-column"><img src="https://via.placeholder.com/700x500" id="i5aswg"></div></div></div></div><div id="ifippm" class="gjs-grid-row"><div id="i5xr2h" class="gjs-grid-column"><div id="icxt4q" class="gjs-grid-row"><div class="gjs-grid-column"><img src="https://via.placeholder.com/700x500" id="iu2y2l"></div><div id="ikcqsj" class="gjs-grid-column"><h2 id="i0emkx" class="gjs-heading">Feature Two text</h2><div id="iju7n8" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div><a id="iw8atf" class="gjs-link">Button</a></div></div></div></div><div id="i97cpf" class="gjs-grid-row"><div id="ie2bur" class="gjs-grid-column"><h2 id="i7tqa9" class="gjs-heading">More Features</h2><div id="i2901h" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div><div id="iqbqyd" class="gjs-grid-row"><div class="gjs-grid-column feature-item"><img src="https://via.placeholder.com/100x100" id="ioanmy"><h3 id="ih5m12" class="gjs-heading">Feature text</h3><div id="i5ikop" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div><a id="isybms" class="gjs-link">Learn more</a></div><div class="gjs-grid-column feature-item"><img src="https://via.placeholder.com/100x100" id="imuxil"><h3 id="ia410y" class="gjs-heading">Feature text</h3><div id="i2xlg1" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div><a id="inozui" class="gjs-link">Learn more</a></div><div class="gjs-grid-column feature-item"><img src="https://via.placeholder.com/100x100" id="ijkgwg"><h3 id="ix6u3g" class="gjs-heading">Feature text</h3><div id="i506k8" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div><a id="iv4qec" class="gjs-link">Learn more</a></div><div class="gjs-grid-column feature-item"><img src="https://via.placeholder.com/100x100" id="i0clr4"><h3 id="igeuza" class="gjs-heading">Feature text</h3><div id="izigz1" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div><a id="isy7cf" class="gjs-link">Learn more</a></div><div class="gjs-grid-column feature-item"><img src="https://via.placeholder.com/100x100" id="iubi5h"><h3 id="itwsuk" class="gjs-heading">Feature text</h3><div id="ivdjnf" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div><a id="i3odal" class="gjs-link">Learn more</a></div><div class="gjs-grid-column feature-item"><img src="https://via.placeholder.com/100x100" id="irt4sx"><h3 id="ih8ymg" class="gjs-heading">Feature text</h3><div id="i3rbae" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div><a id="is5w98" class="gjs-link">Learn more</a></div></div></div></div><div id="ir8p1f" class="gjs-grid-row"><div id="i1tmgg" class="gjs-grid-column"><h2 id="isjmeq" class="gjs-heading">Testimonial section</h2><div id="ie1vbf" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div><div id="iqt3o6" class="gjs-grid-row"><div id="i0w15u" class="gjs-grid-column testimonial-item"><div id="is53h7" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div><div id="i6v2mi" class="gjs-grid-row"><div id="i0x5xh" class="gjs-grid-column"><img src="https://via.placeholder.com/100x100" id="i7psfh"></div><div class="gjs-grid-column"><h4 id="i9qs2t" class="gjs-heading">Full name</h4><div id="ib1r1h" class="text-main-content">Role / Company</div></div></div></div><div id="ing3ro" class="gjs-grid-column testimonial-item"><div id="iexyr3" class="text-main-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div><div id="ikxxh4" class="gjs-grid-row"><div id="i9ux1x" class="gjs-grid-column"><img src="https://via.placeholder.com/100x100" id="ihtecy"></div><div class="gjs-grid-column"><h4 id="i6n8b8" class="gjs-heading">Full name</h4><div id="i0g3yh" class="text-main-content">Role / Company</div></div></div></div></div></div></div><div id="iil40r" class="gjs-grid-row"><div id="i68mh2" class="gjs-grid-column"><div id="i2dxmx" class="gjs-grid-row"><div id="isvqqf" class="gjs-grid-column"><a href="/" id="i2vbhj" class="gjs-link-box"><img src="https://via.placeholder.com/100x100" id="i94swx"></a></div><div id="ig8a5x" class="gjs-grid-column"><h3 id="ilpusz" class="gjs-heading">Footer links</h3><a id="il26ld" class="gjs-link">Footer link<br></a><a id="inxhg6" class="gjs-link">Footer link<br></a><a id="i7jmsp" class="gjs-link">Footer link<br></a></div><div id="ivvy8y" class="gjs-grid-column"><h3 id="ihg6pg" class="gjs-heading">Footer links</h3><a id="ic7z7u" class="gjs-link">Footer link<br></a><a id="ism5ld" class="gjs-link">Footer link<br></a><a id="ibqhra" class="gjs-link">Footer link<br></a><a id="i1hayh" class="gjs-link">Footer link<br></a></div><div id="ikn9mw" class="gjs-grid-column"><h3 id="i4i405" class="gjs-heading">Footer links</h3><a id="if2yjz" class="gjs-link">Footer link<br></a><a id="iq68bc" class="gjs-link">Footer link<br></a><a id="imirqr" class="gjs-link">Footer link<br></a><a id="ir323v" class="gjs-link">Footer link<br></a><a id="iyww2k" class="gjs-link">Footer link<br></a></div></div><div class="gjs-divider"></div><div id="iwrlh6">Copyright © YEAR Company name</div></div></div></body>',
        styles:
          '*{box-sizing:border-box}body{margin:0}.gjs-heading{margin:0}.gjs-grid-column{flex:1 1 0%;padding:5px 0}.gjs-grid-row{display:flex;justify-content:flex-start;align-items:stretch;flex-direction:row;min-height:auto;padding:10px 0}.gjs-link-box{color:inherit;display:inline-block;vertical-align:top;padding:10px;max-width:100%;text-decoration:none}.gjs-link{vertical-align:top;max-width:100%;display:inline-block;text-decoration:none;color:inherit}.text-main-content{line-height:30px;font-size:1.3rem;color:rgb(0 0 0 / .75)}.gjs-grid-column.feature-item{padding-top:15px;padding-right:15px;padding-bottom:15px;padding-left:15px;display:flex;flex-direction:column;align-items:center;gap:15px;min-width:30%}.gjs-grid-column.testimonial-item{padding-top:15px;padding-right:15px;padding-bottom:15px;padding-left:15px;display:flex;flex-direction:column;gap:15px;min-width:45%;background-color:rgb(247 246 246);border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;align-items:flex-start}.gjs-divider{height:3px;margin:10px;background-color:rgb(0 0 0 / .05)}#imlned{color:#000;width:54.13018798828125px;height:32px}#ih5avt{display:block;padding-top:0;padding-bottom:0}#itezp5{flex:0 1 auto;flex-basis:189auto;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0}#igkn1i{padding:10px;font-family:Arial,Helvetica,sans-serif;padding-left:20px;padding-right:20px}#ivpq4g{flex:0 1 auto}#ixcgfo{padding:10px;font-family:Arial,Helvetica,sans-serif;padding-left:20px;padding-right:20px}#igrp1f{flex:0 1 auto}#i7xjkp{padding:10px;font-family:Arial,Helvetica,sans-serif;padding-left:20px;padding-right:20px}#iyvo2d{flex:0 1 auto}#ivyz6b{padding-top:0;padding-bottom:0}#isza67{flex:0 1 auto}#i9qhbl{padding:10px;padding-left:20px;padding-right:20px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;background-color:#000;color:#fff;display:block;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px}#i4s0bs{flex:0 1 auto;display:block;padding-left:10px;padding-right:10px}#istg48{align-items:center;justify-content:space-between;padding-top:0;padding-bottom:0}#i2vft4{width:100%;max-width:1200px}#i8yj1g{justify-content:center;padding-top:0;padding-bottom:0}#idg5og{font-size:3rem}#ivd6pa{padding:10px;max-width:750px;margin-bottom:25px}#ihx6d2{padding:10px;padding-left:20px;padding-right:20px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;background-color:#000;color:#fff;display:inline-block;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px;margin-bottom:50px}#i65j6c{color:#000;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;max-width:100%}#icju9g{max-width:1200px;align-items:center;display:flex;flex-direction:column;gap:10px}#i78pnf{justify-content:center;padding-top:80px;padding-bottom:80px;padding-left:20px;padding-right:20px}#i434c7{font-size:2.5rem}#i6387t{padding:10px;max-width:750px;margin-bottom:25px;padding-left:0;padding-right:0}#iyr17n{padding:10px;padding-left:20px;padding-right:20px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;background-color:#000;color:#fff;display:inline-block;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px}#iouxss{display:flex;flex-direction:column;align-items:flex-start;justify-content:center}#i5aswg{color:#000;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;max-width:100%}#i7wzqf{gap:100px;justify-content:space-between}#i4aljr{max-width:1200px;align-items:center;display:flex;flex-direction:column}#io7c67{justify-content:center;padding-top:80px;padding-bottom:80px;padding-left:20px;padding-right:20px}#iu2y2l{color:#000;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;max-width:100%}#i0emkx{font-size:2.5rem}#iju7n8{padding:10px;max-width:750px;margin-bottom:25px;padding-left:0;padding-right:0}#iw8atf{padding:10px;padding-left:20px;padding-right:20px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;background-color:#000;color:#fff;display:inline-block;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px}#ikcqsj{display:flex;flex-direction:column;align-items:flex-end;justify-content:center;text-align:right}#icxt4q{gap:100px;justify-content:space-between}#i5xr2h{max-width:1200px;align-items:center;display:flex;flex-direction:column}#ifippm{justify-content:center;padding-top:80px;padding-bottom:80px;padding-left:20px;padding-right:20px}#i7tqa9{font-size:2.5rem;margin-bottom:10px;text-align:center}#i2901h{padding:10px;max-width:750px;margin-bottom:70px;padding-left:0;padding-right:0;text-align:center}#ioanmy{color:#000;border-top-left-radius:100%;border-top-right-radius:100%;border-bottom-right-radius:100%;border-bottom-left-radius:100%;max-width:100%}#ih5m12{font-size:1.5rem}#i5ikop{padding:10px;max-width:750px;padding-left:0;padding-right:0;text-align:center}#isybms{padding:10px;padding-left:20px;padding-right:20px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;background-color:#000;color:#fff;display:inline-block;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px}#imuxil{color:#000;border-top-left-radius:100%;border-top-right-radius:100%;border-bottom-right-radius:100%;border-bottom-left-radius:100%;max-width:100%}#ia410y{font-size:1.5rem}#i2xlg1{padding:10px;max-width:750px;padding-left:0;padding-right:0;text-align:center}#inozui{padding:10px;padding-left:20px;padding-right:20px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;background-color:#000;color:#fff;display:inline-block;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px}#ijkgwg{color:#000;border-top-left-radius:100%;border-top-right-radius:100%;border-bottom-right-radius:100%;border-bottom-left-radius:100%;max-width:100%}#ix6u3g{font-size:1.5rem}#i506k8{padding:10px;max-width:750px;padding-left:0;padding-right:0;text-align:center}#iv4qec{padding:10px;padding-left:20px;padding-right:20px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;background-color:#000;color:#fff;display:inline-block;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px}#i0clr4{color:#000;border-top-left-radius:100%;border-top-right-radius:100%;border-bottom-right-radius:100%;border-bottom-left-radius:100%;max-width:100%}#igeuza{font-size:1.5rem}#izigz1{padding:10px;max-width:750px;padding-left:0;padding-right:0;text-align:center}#isy7cf{padding:10px;padding-left:20px;padding-right:20px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;background-color:#000;color:#fff;display:inline-block;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px}#iubi5h{color:#000;border-top-left-radius:100%;border-top-right-radius:100%;border-bottom-right-radius:100%;border-bottom-left-radius:100%;max-width:100%}#itwsuk{font-size:1.5rem}#ivdjnf{padding:10px;max-width:750px;padding-left:0;padding-right:0;text-align:center}#i3odal{padding:10px;padding-left:20px;padding-right:20px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;background-color:#000;color:#fff;display:inline-block;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px}#irt4sx{color:#000;border-top-left-radius:100%;border-top-right-radius:100%;border-bottom-right-radius:100%;border-bottom-left-radius:100%;max-width:100%}#ih8ymg{font-size:1.5rem}#i3rbae{padding:10px;max-width:750px;padding-left:0;padding-right:0;text-align:center}#is5w98{padding:10px;padding-left:20px;padding-right:20px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;background-color:#000;color:#fff;display:inline-block;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px}#iqbqyd{width:100%;flex-wrap:wrap;justify-content:flex-start;gap:50px}#ie2bur{max-width:1200px;align-items:center;display:flex;flex-direction:column}#i97cpf{justify-content:center;padding-top:80px;padding-bottom:80px;padding-left:20px;padding-right:20px}#isjmeq{font-size:2.5rem;margin-bottom:10px;text-align:center}#ie1vbf{padding:10px;max-width:750px;margin-bottom:70px;padding-left:0;padding-right:0;text-align:center}#is53h7{padding:10px;padding-left:0;padding-right:0}#i7psfh{color:#000;border-top-left-radius:100%;border-top-right-radius:100%;border-bottom-right-radius:100%;border-bottom-left-radius:100%;max-width:100%;width:75px}#i0x5xh{flex:0 1 auto}#i9qs2t{font-size:1.5rem}#ib1r1h{color:rgb(0 0 0 / .5)}#i6v2mi{width:100%;gap:20px;align-items:center}#i0w15u{justify-content:space-between}#iexyr3{padding:10px;padding-left:0;padding-right:0}#ihtecy{color:#000;border-top-left-radius:100%;border-top-right-radius:100%;border-bottom-right-radius:100%;border-bottom-left-radius:100%;max-width:100%;width:75px}#i9ux1x{flex:0 1 auto}#i6n8b8{font-size:1.5rem}#i0g3yh{color:rgb(0 0 0 / .5)}#ikxxh4{width:100%;gap:20px;align-items:center}#ing3ro{justify-content:space-between}#iqt3o6{width:100%;flex-wrap:wrap;justify-content:flex-start;gap:50px}#i1tmgg{max-width:1200px;align-items:center;display:flex;flex-direction:column}#ir8p1f{justify-content:center;padding-top:80px;padding-bottom:80px;padding-left:20px;padding-right:20px}#i94swx{color:#000;width:54.13018798828125px;height:54px;border-top-left-radius:100%;border-top-right-radius:100%;border-bottom-right-radius:100%;border-bottom-left-radius:100%}#i2vbhj{display:block;padding-top:0;padding-bottom:0}#isvqqf{flex:0 1 auto;margin-right:auto}#ilpusz{margin-bottom:10px;text-transform:uppercase}#il26ld{display:block}#inxhg6{display:block}#i7jmsp{display:block}#ig8a5x{display:flex;flex-direction:column;gap:15px;flex:0 1 auto}#ihg6pg{margin-bottom:10px;text-transform:uppercase}#ic7z7u{display:block}#ism5ld{display:block}#ibqhra{display:block}#i1hayh{display:block}#ivvy8y{display:flex;flex-direction:column;gap:15px;flex:0 1 auto}#i4i405{margin-bottom:10px;text-transform:uppercase}#if2yjz{display:block}#iq68bc{display:block}#imirqr{display:block}#ir323v{display:block}#iyww2k{display:block}#ikn9mw{display:flex;flex-direction:column;gap:15px;flex:0 1 auto}#i2dxmx{gap:100px;padding-bottom:30px}#iwrlh6{padding:10px;text-align:center;font-size:.9rem;margin-top:20px}#i68mh2{max-width:1200px;display:flex;flex-direction:column}#iil40r{justify-content:center;padding-top:80px;padding-left:20px;padding-right:20px;padding-bottom:30px}#i4km0b{font-family:Arial,Helvetica,sans-serif}@media (max-width:992px){.gjs-grid-row{flex-direction:column}#i6v2mi{flex-direction:row}#ikxxh4{flex-direction:row}}'
      },
      {
        id: 'page-2',
        name: 'Page 2',
        component: '<div id="comp2">Page 2</div>',
        styles: '#comp2 { color: green }'
      },
      {
        id: 'page-3',
        name: 'Page 3',
        component: '<div id="comp3">Page 3</div>',
        styles: '#comp3 { color: blue }'
      }
    ]
  }
}

const canDelete = computed(() => pages.value.length > 1)

onMounted(() => {
  //
})
</script>

<style lang="sass">
.gjs-panel-left
  line-height: 1
  .layers-container
    .gjs-category-title, .gjs-layer-title, .gjs-block-category .gjs-title, .gjs-sm-sector-title, .gjs-trait-category .gjs-title
      font-weight: 400
      font-size: var(--gjs-font-size)
  .q-item
    padding: 0 10px
  .gjs-pages .q-item,
  .gjs-pages .q-field
    font-size: var(--gjs-font-size)
    &.q-item--active
      color: $grey-5
      background: var(--gjs-main-light-color)
  .q-icon
    color: $grey-5
  .gjs-pages
    .q-field--dense .q-field__control, .q-field--dense .q-field__marginal
      height: auto
    .q-field__native
      padding: 0
      color: $grey-5
</style>
