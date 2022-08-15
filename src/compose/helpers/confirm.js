import { reactive, toRefs } from 'vue';

export default () => {
  const state = reactive({
    visible: false,
  });

  const show = () => (state.visible = true);
  const hide = () => (state.visible = false);

  return {
    ...toRefs(state),
    show,
    hide,
  };
};
