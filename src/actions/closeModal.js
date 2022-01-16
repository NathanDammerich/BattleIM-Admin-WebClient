export const closeModal = () => {
  let existingModals = JSON.parse(sessionStorage.getItem("modal"));
  existingModals.pop();
  sessionStorage.setItem("modal", JSON.stringify(existingModals));
};
