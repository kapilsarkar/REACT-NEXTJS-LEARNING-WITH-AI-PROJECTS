import BasicProps from "./components/BasicProps.jsx";
import ChildrenProps from "./components/ChildrenProps.jsx";
import ComplexProps from "./components/ComplexProps.jsx";
import RefProps from "./components/RefProps.jsx";
import ThemeToggler from "./components/ThemeToggler.jsx";

function Navigation(){
  const isDark = true;
}
const sections = [
  {id:"basic", label:"Basic Props", icon:"📦"},
  {id:"ref", label:"ref Props", icon:"🔗"},
  {id:"children", label:"children Props", icon:"👶"},\
  {id:"complex", label:"complex Props", icon:"🧩"},
  {id:"theme", label:"theme Props", icon:"🎨"},

  return (
    
  )

]
function App() {
  return (
    <>
      <h2>prop Guide</h2>\
      <BasicProps />
      <ChildrenProps />
      <ComplexProps />
      <RefProps />
      <ThemeToggler />
    </>
  );
}

export default App;
