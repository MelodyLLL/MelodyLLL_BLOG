import{d as l,r as _,b as h,e as u,f as d,o as m,c as f,g as t,h as e,i as a,w as r,_ as p}from"./app-abb8a49b.js";const v={id:"留言板子",tabindex:"-1"},b=t("a",{class:"header-anchor",href:"#留言板子","aria-hidden":"true"},"#",-1),x={id:"富强、民主、文明、和谐",tabindex:"-1"},k=t("a",{class:"header-anchor",href:"#富强、民主、文明、和谐","aria-hidden":"true"},"#",-1),C={id:"自由、平等、公正、法治",tabindex:"-1"},B=t("a",{class:"header-anchor",href:"#自由、平等、公正、法治","aria-hidden":"true"},"#",-1),w={id:"爱国、敬业、诚信、友善",tabindex:"-1"},M=t("a",{class:"header-anchor",href:"#爱国、敬业、诚信、友善","aria-hidden":"true"},"#",-1),N=l({__name:"comment.html",setup(S){const o=_(!1);let c;return h(()=>{const n=document.querySelector("html");o.value=n.classList.contains("dark"),c=new MutationObserver(()=>{o.value=n.classList.contains("dark")}),c.observe(n,{attributeFilter:["class"],attributes:!0})}),u(()=>{c.disconnect()}),console.log(o,"???"),(n,V)=>{const s=d("center"),i=d("CommentService");return m(),f("div",null,[t("h1",v,[b,e(),a(s,null,{default:r(()=>[e("留言板子")]),_:1})]),t("h1",x,[k,e(),a(s,null,{default:r(()=>[e("富强、民主、文明、和谐")]),_:1})]),t("h1",C,[B,e(),a(s,null,{default:r(()=>[e("自由、平等、公正、法治")]),_:1})]),t("h1",w,[M,e(),a(s,null,{default:r(()=>[e("爱国、敬业、诚信、友善")]),_:1})]),a(i,{darkmode:o.value},null,8,["darkmode"])])}}}),L=p(N,[["__file","comment.html.vue"]]);export{L as default};
