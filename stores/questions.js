export const useQuestionsStore = defineStore("questions", () => {
  const supabase = useSupabaseClient();
  const toastStore = useToastStore();

  // question data and loading state
  const questionData = ref([]);
  const isLoading = ref(true);


  // get questions
  async function getQuestions() {
    const { data, error } = await supabase.from("questions").select("*");

    if (error) {
      toastStore.changeToast("Error retrieving questions", error.message);
      return;
    }
    questionData.value = data;
  }


  // rerender MathJax, really for route changes or if you flip through the tabs
  function rerenderMathJax() {
    if (window.MathJax) {
      MathJax.typesetPromise().then(() => {
        isLoading.value = false;
      });
    }
  }


  // put the MathJax script in the head
  function getMathJax() {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      rerenderMathJax();
      isLoading.value = false;
    };
    
    script.onerror = () => {
      toastStore.changeToast("Error loading MathJax", "Please refresh the page");
      isLoading.value = false;
    };
  }


  // get questions on mount and load MathJax (which renders it on load)
  onMounted(async () => {
    await getQuestions();
    getMathJax();
  });

  return { questionData, isLoading, getMathJax, rerenderMathJax };
});
