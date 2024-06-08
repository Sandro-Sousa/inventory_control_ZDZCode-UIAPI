import Vue3Toastify, { toast } from 'vue3-toastify';
import type { ToastContainerOptions, Content} from 'vue3-toastify';

export default defineNuxtPlugin(({vueApp}) => {
    vueApp.use(Vue3Toastify, {
        autoclose: 2000,
    } as ToastContainerOptions);

    toast.error = (message: Content) =>
        toast(message, {
          type: "error",
          position: "top-right",
          icon: "❌",
          theme: "dark",
        });

    return { 
        provide: { 
          toast,
        },
    };
});
