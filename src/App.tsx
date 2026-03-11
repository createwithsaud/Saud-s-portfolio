/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import BlogDemo from './pages/BlogDemo';
import EcommerceDemo from './pages/EcommerceDemo';
import SocialDemo from './pages/SocialDemo';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/demo/blog" element={<BlogDemo />} />
        <Route path="/demo/ecommerce" element={<EcommerceDemo />} />
        <Route path="/demo/social" element={<SocialDemo />} />
      </Routes>
    </Router>
  );
}
