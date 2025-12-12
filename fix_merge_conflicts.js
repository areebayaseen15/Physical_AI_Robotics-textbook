const fs = require('fs');
const path = require('path');

// Function to resolve merge conflicts in a file
function resolveMergeConflicts(content) {
  // Regular expression to match git merge conflict markers
  const conflictPattern = /<<<<<<< HEAD\s*([\s\S]*?)=======\s*([\s\S]*?)>>>>>>> [a-f0-9]{7,40}\s*/g;

  // Replace conflicts with the first option (HEAD content)
  let resolvedContent = content.replace(conflictPattern, (match, headContent, remoteContent) => {
    // If both sides are identical (ignoring line ending differences), just return one
    const normalizedHead = headContent.replace(/\r\n/g, '\n');
    const normalizedRemote = remoteContent.replace(/\r\n/g, '\n');

    if (normalizedHead.trim() === normalizedRemote.trim()) {
      return normalizedHead.trim() + '\n';
    }

    // Otherwise, prefer the HEAD content
    return headContent;
  });

  return resolvedContent;
}

// Get all files with merge conflicts
const conflictFiles = [
  'src/theme/Root.js',
  'src/pages/index.tsx',
  'src/pages/index.module.css',
  'src/components/chat.css',
  'src/components/ChatWidget.js',
  'specs/1-textbook-project-structure/checklists/requirements.md',
  'package-lock.json',
  'docs/Module4-VisionLanguageAction/VisionLAnguageAction.md',
  'docs/Module2-Digital-Twin/Chapter2-GazeboPhysics/2.3 Collision-Detection.md',
  'docs/Module2-Digital-Twin/Chapter2-GazeboPhysics/2.2 Gravity and Inertial Properties.md',
  'docs/Module2-Digital-Twin/Chapter2-GazeboPhysics/2.1 Introduction to Physics in Gazebo.md',
  'docs/Module2-Digital-Twin/Chapter1-PhysicsSimulation/index.md',
  'docs/Module2-Digital-Twin/Chapter1-PhysicsSimulation/1.3 UnityRendering.md',
  'docs/Module2-Digital-Twin/Chapter1-PhysicsSimulation/1.2 SimulatingPhysicsGazebo.md',
  'docs/Module2-Digital-Twin/Chapter1-PhysicsSimulation/1.1 IntroPhysicsSimulation.md',
  'docs/Module1-ROS/Chapter4-LaunchParamsLifecycle/_category_.json',
  'docs/Module1-ROS/Chapter3-PythonAgentsWithRclpy/1-3.1 NodeCreation.md',
  'docs/Module1-ROS/Chapter2-Nodes,TopicsService,Action/1-2.4 Actions.md',
  'docs/Module1-ROS/Chapter2-Nodes,TopicsService,Action/1-2.3 Services.md',
  'docs/Module1-ROS/Chapter2-Nodes,TopicsService,Action/1-2.2 Topics.md',
  'docs/Module1-ROS/Chapter1-Introduction-to-ROS2/index.md.md',
  'docs/01-introduction/introduction.md',
  'babel.config.js'  // Already fixed
];

// Process each file
conflictFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);

  if (file === 'babel.config.js') {
    // Skip this one as it's already fixed
    console.log(`Skipping ${file} - already fixed`);
    return;
  }

  if (fs.existsSync(fullPath)) {
    try {
      const content = fs.readFileSync(fullPath, 'utf8');

      if (content.includes('<<<<<<< HEAD')) {
        const resolvedContent = resolveMergeConflicts(content);
        fs.writeFileSync(fullPath, resolvedContent, 'utf8');
        console.log(`✓ Fixed merge conflicts in ${file}`);
      } else {
        console.log(`- No merge conflicts found in ${file}`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  } else {
    console.log(`- File not found: ${file}`);
  }
});

console.log('\nMerge conflict resolution complete!');