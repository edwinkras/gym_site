// This is where all the values (words, characters and numbers) are written and taken care of

var LS_USERS = 'locoUsers';
var LS_CART = 'locoCart';
var LS_REMEMBERED = 'rememberedUser';
var SS_CURRENT = 'currentUser';

var PRODUCTS = [
    { id: 1, name: 'Loco Gym T-Shirt', price: 24.99, category: 'clothing', description: 'Classic cotton tee with the Loco Gym logo. Available in S, M, L, XL.', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop' },
    { id: 2, name: 'Loco Gym Tank Top', price: 19.99, category: 'clothing', description: 'Breathable workout tank for intense training sessions.', image: 'https://images.unsplash.com/photo-1659350776365-da58737786cb?w=400&h=300&fit=crop' },
    { id: 3, name: 'Loco Gym Bottle', price: 14.99, category: 'accessories', description: '750ml insulated stainless steel bottle. Keeps drinks cold for 24h.', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop' },
    { id: 4, name: 'Loco Gym Bag', price: 39.99, category: 'accessories', description: 'Durable duffel bag with shoe compartment and side pockets.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop' },
    { id: 5, name: 'Loco Gym Hoodie', price: 44.99, category: 'clothing', description: 'Warm fleece hoodie with embroidered Loco Gym logo.', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop' },
    { id: 6, name: 'Protein Shaker', price: 12.99, category: 'accessories', description: '600ml shaker with mixing ball. Leak-proof design.', image: 'https://images.unsplash.com/photo-1592582228635-ad72046ce827?w=400&h=300&fit=crop' },
    { id: 7, name: 'Wrist Wraps', price: 16.99, category: 'gear', description: 'Heavy-duty wrist wraps for powerlifting and bench press support.', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop' },
    { id: 8, name: 'Resistance Bands Set', price: 22.99, category: 'gear', description: '5-piece resistance band set for warm-ups and mobility work.', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=300&fit=crop' }
];

var TRAINERS = [
    { id: 1, name: 'Marc Dupont', specialty: 'Strength & Powerlifting', category: 'strength', bio: '10+ years of competitive powerlifting. Specializes in squat, bench, and deadlift programming. Helped 50+ clients compete at provincial level.', locations: 'Downtown, Hochelaga', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop' },
    { id: 2, name: 'Sophie Tremblay', specialty: 'Cardio & HIIT', category: 'cardio', bio: 'Certified HIIT specialist with a passion for endurance training. Runs the most popular group cardio classes at Loco Gym.', locations: 'Plateau, Villeray', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop' },
    { id: 3, name: 'Jean-Philippe Roy', specialty: 'Bodybuilding', category: 'bodybuilding', bio: 'Former competitive bodybuilder and certified nutrition expert. Creates personalized hypertrophy and meal plans for clients.', locations: 'Downtown, Laval', image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=300&fit=crop' },
    { id: 4, name: 'Camille Beaumont', specialty: 'Yoga & Flexibility', category: 'yoga', bio: '200-hour certified yoga instructor. Teaches vinyasa and restorative yoga classes. Focuses on mobility and recovery.', locations: 'Plateau, Downtown', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop' },
    { id: 5, name: 'Alexandre Cote', specialty: 'Strength & Conditioning', category: 'strength', bio: 'Former college football S&C coach. Specializes in athletic performance, speed training, and functional movement.', locations: 'Laval, Villeray', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop' },
    { id: 6, name: 'Isabelle Gagnon', specialty: 'Cardio & Dance Fitness', category: 'cardio', bio: 'Brings energy and fun to every class. Specializes in Zumba, dance cardio, and kickboxing-inspired workouts.', locations: 'Hochelaga, Plateau', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=300&fit=crop' }
];

var LOCATIONS = [
    { id: 1, name: 'Loco Gym Downtown', address: '1234 Rue Sainte-Catherine O, Montreal, QC H3G 1P1', area: 'downtown', hours: 'Mon-Fri: 5AM - 11PM | Sat-Sun: 7AM - 9PM', phone: '(514) 555-0101', busyLevel: 35 },
    { id: 2, name: 'Loco Gym Plateau', address: '789 Avenue du Mont-Royal E, Montreal, QC H2J 1W8', area: 'plateau', hours: 'Mon-Fri: 6AM - 10PM | Sat-Sun: 8AM - 8PM', phone: '(514) 555-0202', busyLevel: 72 },
    { id: 3, name: 'Loco Gym Hochelaga', address: '3456 Rue Ontario E, Montreal, QC H1W 1R5', area: 'hochelaga', hours: 'Mon-Fri: 5AM - 11PM | Sat-Sun: 7AM - 9PM', phone: '(514) 555-0303', busyLevel: 50 },
    { id: 4, name: 'Loco Gym Laval', address: '2100 Boulevard Le Carrefour, Laval, QC H7S 1Z6', area: 'laval', hours: 'Mon-Fri: 5AM - 10PM | Sat-Sun: 7AM - 8PM', phone: '(450) 555-0404', busyLevel: 20 },
    { id: 5, name: 'Loco Gym Villeray', address: '560 Rue de Castelnau E, Montreal, QC H2R 1R3', area: 'villeray', hours: 'Mon-Fri: 6AM - 10PM | Sat-Sun: 8AM - 8PM', phone: '(514) 555-0505', busyLevel: 85 }
];

var MEMBERSHIPS = [
    { id: 1, tier: 'Basic', price: 19.99, tagline: 'Great for getting started', features: ['Access to gym floor', 'Cardio equipment', 'Locker room access', 'Free Wi-Fi', '1 location only'] },
    { id: 2, tier: 'Standard', price: 34.99, tagline: 'Best value for regular gym-goers', features: ['All Basic features', 'Group fitness classes', 'All locations access', 'Guest pass (1/month)', '10% store discount'] },
    { id: 3, tier: 'Premium', price: 49.99, tagline: 'The ultimate fitness experience', features: ['All Standard features', '2 personal trainer sessions/month', 'Custom nutrition plan', 'Priority class booking', '20% store discount', 'Free towel service'] }
];

var DEFAULT_CLIENTS = [
    { name: 'Thrall Hellscream', email: 'thrall@orgrimmar.com', phone: '(514) 555-1201', plan: 'premium', password: 'loktar1', createdAt: '2025-09-15T10:00:00.000Z' },
    { name: 'Jaina Proudmoore', email: 'jaina.proudmoore@dalaran.com', phone: '(514) 555-3344', plan: 'premium', password: 'frostbolt3', createdAt: '2025-10-02T10:00:00.000Z' },
    { name: 'Arthas Menethil', email: 'arthas@lordaeron.com', phone: '(438) 555-7788', plan: 'basic', password: 'frostmourne', createdAt: '2025-10-20T10:00:00.000Z' },
    { name: 'Sylvanas Windrunner', email: 'sylvanas@undercity.com', phone: '(514) 555-9012', plan: 'premium', password: 'darkranger9', createdAt: '2025-11-03T10:00:00.000Z' },
    { name: 'Illidan Stormrage', email: 'illidan@blacktemple.com', phone: '(450) 555-2211', plan: 'standard', password: 'notprepared', createdAt: '2025-11-18T10:00:00.000Z' },
    { name: 'Tyrande Whisperwind', email: 'tyrande@darnassus.com', phone: '(514) 555-6543', plan: 'standard', password: 'elune77', createdAt: '2025-12-01T10:00:00.000Z' },
    { name: 'Voljin Darkspear', email: 'voljin@darkspear.com', phone: '(438) 555-4321', plan: 'basic', password: 'loa4life', createdAt: '2026-01-10T10:00:00.000Z' },
    { name: 'Anduin Wrynn', email: 'anduin@stormwind.com', phone: '(514) 555-8765', plan: 'standard', password: 'lightbringer', createdAt: '2026-01-25T10:00:00.000Z' },
    { name: 'Garrosh Hellscream', email: 'garrosh@orgrimmar.com', phone: '(450) 555-1199', plan: 'premium', password: 'ironhorde1', createdAt: '2026-02-14T10:00:00.000Z' },
    { name: 'Malfurion Stormrage', email: 'malfurion@moonglade.com', phone: '(514) 555-5577', plan: 'basic', password: 'druidlife', createdAt: '2026-03-05T10:00:00.000Z' }
];

if (!localStorage.getItem(LS_USERS)) {
    localStorage.setItem(LS_USERS, JSON.stringify(DEFAULT_CLIENTS));
}

var DEFAULT_NOTIFICATIONS = [
    { icon: 'bi-credit-card', message: 'Payment reminder: Your membership renews on May 1st.' },
    { icon: 'bi-fire', message: 'Summer promo: 20% off all annual plans!' },
    { icon: 'bi-trophy', message: 'Stay motivated! You\'re on a 5-day streak.' }
];
