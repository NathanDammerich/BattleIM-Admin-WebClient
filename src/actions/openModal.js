export const openModal = (modal) => {
  let existingModals = JSON.parse(sessionStorage.getItem("modal"));
  if (existingModals == null) existingModals = [];
  existingModals.push(modal);
  sessionStorage.setItem("modal", JSON.stringify(existingModals));
};
