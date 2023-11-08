<template>
  <div class="main-menu">
    <div class="logo">
      <img src="https://lolicode.gitee.io/scui-doc/demo/img/logo.png" />
      <h2 v-show="!isFold" class="title">时光Web</h2>
    </div>

    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse-transition="false"
        popper-effect="dark"
        :unique-opened="true"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
              <!-- 这里有好几种方法 -->
              <el-icon>
                <Icon :icon="`ep:${item.icon.split('-icon-')[1]}`" />
              </el-icon>
              <!-- <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon> -->
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useLoginStore } from '@/store/modules/login'
import { mapPathToMenu } from '@/utils'
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
// 获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 菜单的点击
const router = useRouter()

const handleItemClick = (item: any) => {
  const url = item.url
  router.push(url)
}

// 菜单的默认值
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="scss" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 50px;
  padding: 0 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    margin: 0 10px;
    width: 30px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
  transition: all 10ms;
}

.el-sub-menu {
  --el-menu-hover-bg-color: #87ceeb4d;
  --el-menu-text-color: #ffffff;
  :global(.el-menu-item:hover) {
    --el-menu-hover-bg-color: #87ceeb4d;
    --el-menu-text-color: #ffffff;
  }
  :global(.el-menu-item) {
    --el-menu-text-color: #ffffff;
  }
  :global(.el-menu--popup) {
    padding: 0;
  }

  .el-menu-item:hover {
    color: #fff;
    background-color: #87ceeb4d;
  }

  .el-menu-item.is-active {
    background-color: #87ceeb4d;
  }
}
</style>
