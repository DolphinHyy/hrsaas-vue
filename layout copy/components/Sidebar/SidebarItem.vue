<template>
  <!-- item.hidden为空或者undefined时展现出来 -->
  <div v-if="!item.hidden">
    <!-- hasOneShowingChild(item.children,item) 儿子的hidden属性不为true-->
    <!-- !onlyOneChild.children 不是只有一个儿子 -->
    <!-- onlyOneChild.noShowingChildren 没有儿子 -->
    <!-- !item.alwaysShow 属性为假 --> <!-- alwaysShow 总是显示 -->
    <template v-if="hasOneShowingChild(item.children,item) && (onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  created() {
    // console.log(this.item.hidden, this.item, 1111111111)
    console.log(this.item.alwaysShow)
  },
  methods: {

    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        /* 如果子路由hidden为true时不显示 */
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          // 临时设置（如果只有一个显示的孩子将使用）
          this.onlyOneChild = item
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      // 如果没有要显示的子路由器，则显示父级
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
