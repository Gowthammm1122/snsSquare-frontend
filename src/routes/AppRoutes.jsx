import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import UseCase from "../pages/UseCase/UseCase";
import UseCaseDetail from "../pages/UseCase/useCaseDetail/UseCaseDetail";
import LifeAtSNSSquare from "../pages/lifeAtSnsSquare";
import HomePage from '../pages/Home';
import AboutUsPage from '../pages/aboutUs';
import Careers from '../pages/careers';
import ContactUs from '../pages/contactUs';
import AgentsDetails from "../pages/agentWorkbench/AgentsDetails";
import CategoriesAgents from "../pages/agentWorkbench/CategoriesAgents";
import Categories from "../pages/agentWorkbench/Categories";
import AgentWorkbenchIndex from "../pages/agentWorkbench/Index";
import Sidebar from "../components/common/Sidebar";
import OrbitCircle from "../pages/agentWorkbench/orbitCircle";
import AgentPlayGround from "../components/pages/agentWorkBench/AgentPlayGround";
import AgentDisplay from "../components/pages/agentWorkBench/AgentDisplay";
import AgentRouter from "../components/pages/agentWorkBench/AgentRouter";
import MediaEntertainment from "../pages/mediaEntertainment";
import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleBasedRoute from "../components/common/RoleBasedRoute";
import AgentTryPage from "../components/pages/agentWorkBench/AgentTryPage";
import AgentDetailsPage from "../components/pages/agentWorkBench/AgentDetailsPage";
import { BlogGrid, BlogDetail } from "../pages/blog";
import JobDescription from "../pages/careers/JobDescription";
import JobApplicationPage from "../pages/careers/JobApplicationPage";
import PolicyPage from "../pages/policy/PolicyPage";
import Login from "../pages/Auth/login";
import Signup from "../pages/Auth/signup";
import AdminDashboard from "../pages/admin/dashboard";
import AdminUseCase from "../pages/admin/useCase";
import AdminBlog from "../pages/admin/blogsPage";
import AdminCareer from "../pages/admin/jobOpenings";
import NotFound from "../pages/notFound/index";
import AllBlogsPage from "../pages/admin/allBlogsPage";
import BlogPreview from "../components/Adminpages/blogs/BlogPreview";

export default function AppRoutes() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: pathname });
  }, [pathname]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/usecase" element={<UseCase />} />
      <Route path="/usecase/:category/:id" element={<UseCaseDetail />} />
      <Route path="/usecase/:id" element={<UseCaseDetail />} />
      <Route path="/life-at-sns" element={<LifeAtSNSSquare />} />
      <Route path="/resources" element={<BlogGrid />} />
      <Route path="/resources/blog" element={<BlogGrid />} />
      <Route path="/resources/blog/:id" element={<BlogDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Policy Pages */}
      <Route path="/privacy-policy" element={<PolicyPage />} />
      <Route path="/terms-of-service" element={<PolicyPage />} />

      {/* Careers Routes */}
      <Route path="/careers/:id" element={<JobDescription />} />
      <Route path="/careers/JobApplicationPage" element={<JobApplicationPage />} />

      {/* ADMIN ONLY Routes */}
      <Route path="/admin" element={
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </RoleBasedRoute>
      } />

      <Route path="/admin/usecase" element={
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminUseCase />
        </RoleBasedRoute>
      } />
      
      <Route path="/admin/blog/new" element={
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminBlog />
        </RoleBasedRoute>
      } />

      <Route path="/admin/blog/edit/:blogId" element={
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminBlog />
        </RoleBasedRoute>
      } />

      <Route path="/admin/blog/preview" element={
        <RoleBasedRoute allowedRoles={['admin']}>
          <BlogPreview />
        </RoleBasedRoute>
      } />

        <Route path="/admin/blog/all" element={
        <RoleBasedRoute allowedRoles={['admin']}>
          <AllBlogsPage/>
        </RoleBasedRoute>
      } />
      
      <Route path="/admin/jobopenings" element={
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminCareer />
        </RoleBasedRoute>
      } />
      
      <Route path="/admin/jobopenings/newJob" element={
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminCareer />
        </RoleBasedRoute>
      } />
      
      <Route path="/admin/jobopenings/applications" element={
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminCareer />
        </RoleBasedRoute>
      } />
      
      {/* Protected Routes - Require Authentication (Any logged-in user) */}
      <Route path="/media-entertainment" element={
        <ProtectedRoute>
          <MediaEntertainment />
        </ProtectedRoute>
      } />
      
      {/* Agent Workbench - Protected for authenticated users */}
      <Route path="/agent-workbench/try/:categoryId/:agentId" element={
        <ProtectedRoute>
          <AgentTryPage />
        </ProtectedRoute>
      } />
      
      <Route path="/agent-workbench/details/:categoryId/:agentId" element={
        <ProtectedRoute>
          <AgentDetailsPage />
        </ProtectedRoute>
      } />

      {/* Agent Workbench Routes */}
      <Route path="/agent-workbench" element={<OrbitCircle />}>
        <Route index element={
          <ProtectedRoute>
            <AgentWorkbenchIndex />
          </ProtectedRoute>
        } />

        <Route path="industry-specific-agents/:categoryId/agents" element={
          <ProtectedRoute>
            <CategoriesAgents />
          </ProtectedRoute>
        } />

        <Route path=":category">
          <Route index element={
            <ProtectedRoute>
              <AgentWorkbenchIndex />
            </ProtectedRoute>
          } />

          <Route path=":categoryId" element={<Sidebar />}>
            <Route index element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            } />
            <Route path="agents" element={
              <ProtectedRoute>
                <CategoriesAgents />
              </ProtectedRoute>
            } />
            <Route path=":subcategoryId/agents" element={
              <ProtectedRoute>
                <CategoriesAgents />
              </ProtectedRoute>
            } />
          </Route>
        </Route>
      </Route>
      
      {/* Agent Playground Routes */}
      <Route path="/agent-playground" element={
        <ProtectedRoute>
          <AgentPlayGround />
        </ProtectedRoute>
      } />
      <Route path="/agent-playground/agent" element={
        <ProtectedRoute>
          <AgentDisplay />
        </ProtectedRoute>
      } />
      <Route path="/agent-playground/agent/:agentId" element={
        <ProtectedRoute>
          <AgentRouter />
        </ProtectedRoute>
      } />

      {/* Legacy Agent Details Routes - Protected */}
      <Route path="/agent-workbench/:category/:categoryId/:subcategoryId/agents/:agentId" element={
        <ProtectedRoute>
          <AgentsDetails />
        </ProtectedRoute>
      } />
      <Route path="/agent-workbench/:category/:categoryId/agents/:agentId" element={
        <ProtectedRoute>
          <AgentsDetails />
        </ProtectedRoute>
      } />

      {/* 404 Not Found - MUST BE LAST ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}