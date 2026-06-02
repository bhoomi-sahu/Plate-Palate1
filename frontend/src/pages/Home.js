import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

import {
  AuthContext,
} from "../context/AuthContext";

// ── Category list ─────────────────────────────────────────

const CATEGORIES = [

  { label: "All", emoji: "🍽️" },

  { label: "Tiffin", emoji: "🥘" },

  { label: "Cake", emoji: "🎂" },

  { label: "Snacks", emoji: "🥟" },

  { label: "Sweets", emoji: "🍮" },

  { label: "Drinks", emoji: "🥤" },

  { label: "Thali", emoji: "🍱" },

  { label: "Other", emoji: "✨" },

];

// ── Styles ───────────────────────────────────────────────

const S = {

  page: {

    minHeight: "100vh",

    background: "#FDF6EE",

    fontFamily: "'Segoe UI', sans-serif",

  },

  hero: {

    background:
      "linear-gradient(135deg, #2E1A0E 0%, #5C3A1E 100%)",

    padding: "2.5rem 2rem 2rem",

    textAlign: "center",

  },

  heroBadge: {

    display: "inline-block",

    background: "#E8621A",

    color: "#fff",

    fontSize: "11px",

    letterSpacing: "1.5px",

    textTransform: "uppercase",

    padding: "4px 14px",

    borderRadius: "20px",

    marginBottom: "12px",

    fontWeight: 600,

  },

  heroTitle: {

    fontFamily: "Georgia, serif",

    fontSize: "clamp(24px, 5vw, 36px)",

    color: "#fff",

    lineHeight: 1.25,

    margin: "0 0 8px",

  },

  heroAccent: {

    color: "#F5A06A",

  },

  heroSub: {

    color: "rgba(255,255,255,0.55)",

    fontSize: "14px",

    margin: 0,

  },

  filterBar: {

    display: "flex",

    gap: "10px",

    padding: "1.25rem 1.5rem",

    overflowX: "auto",

    background: "#FDF6EE",

    borderBottom:
      "0.5px solid rgba(0,0,0,0.08)",

    scrollbarWidth: "none",

  },

  grid: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fill, minmax(270px, 1fr))",

    gap: "1.5rem",

    padding: "2rem",

    maxWidth: "1200px",

    margin: "0 auto",

  },

  empty: {

    gridColumn: "1/-1",

    textAlign: "center",

    padding: "4rem 1rem",

    color: "#bbb",

    fontSize: "15px",

  },

};

// ── Food Card ────────────────────────────────────────────

function FoodCard({

  food,

  user,

  onAddToCart,

}) {

  const navigate =
    useNavigate();

  const [hover, setHover] =
    useState(false);

  const [adding, setAdding] =
    useState(false);

  const [faved, setFaved] =
    useState(false);

  const imageUrl =
    food.image

      ? `http://localhost:5000/${food.image}`

      : "https://placehold.co/600x400/f5a06a/ffffff?text=Food";

  // ADD TO CART

  const handleAdd =
  async () => {

    if (adding) return;

    setAdding(true);

    await onAddToCart(
      food._id
    );

    setTimeout(() => {

      setAdding(false);

    }, 1500);

  };

  return (

    <div

      onMouseEnter={()=>
        setHover(true)
      }

      onMouseLeave={()=>
        setHover(false)
      }

      style={{

        background: "#fff",

        borderRadius: "16px",

        overflow: "hidden",

        border:
          "0.5px solid rgba(0,0,0,0.07)",

        transform:
          hover
            ? "translateY(-6px)"
            : "translateY(0)",

        boxShadow:
          hover

            ? "0 16px 36px rgba(46,26,14,0.13)"

            : "0 2px 8px rgba(0,0,0,0.04)",

        transition:
          "all 0.22s",

      }}
    >

      {/* IMAGE */}

      <div

        style={{

          position: "relative",

          height: "190px",

          overflow: "hidden",

          cursor: "pointer",

        }}

        onClick={()=>
          navigate(
            `/food/${food._id}`
          )
        }
      >

        <img

          src={imageUrl}

          alt={food.title}

          style={{

            width: "100%",

            height: "100%",

            objectFit: "cover",

            transform:
              hover
                ? "scale(1.07)"
                : "scale(1)",

            transition:
              "transform 0.4s ease",

          }}

        />

        {/* CATEGORY */}

        <span

          style={{

            position: "absolute",

            top: "10px",

            left: "10px",

            background:
              "rgba(46,26,14,0.72)",

            color: "#fff",

            fontSize: "11px",

            padding: "3px 10px",

            borderRadius: "12px",

            fontWeight: 600,

          }}
        >

          {food.category}

        </span>

        {/* LIKE */}

        <button

          onClick={(e)=> {

            e.stopPropagation();

            setFaved(!faved);

          }}

          style={{

            position: "absolute",

            top: "10px",

            right: "10px",

            width: "32px",

            height: "32px",

            border: "none",

            borderRadius: "50%",

            background: "#fff",

            cursor: "pointer",

            fontSize: "16px",

          }}
        >

          {
            faved
              ? "❤️"
              : "🤍"
          }

        </button>

      </div>

      {/* BODY */}

      <div
        style={{
          padding: "14px 16px 16px",
        }}
      >

        <h2

          style={{

            fontFamily:
              "Georgia, serif",

            fontSize: "17px",

            fontWeight: 600,

            color: "#2E1A0E",

            marginBottom: "4px",

          }}
        >

          {food.title}

        </h2>

        <p

          style={{

            fontSize: "13px",

            color: "#999",

            lineHeight: 1.5,

            marginBottom: "10px",

            height: "40px",

            overflow: "hidden",

          }}
        >

          {food.description}

        </p>

        {/* PRICE + SELLER */}

        <div

          style={{

            display: "flex",

            alignItems: "center",

            justifyContent:
              "space-between",

            marginBottom: "12px",

          }}
        >

          <span

            style={{

              fontSize: "20px",

              fontWeight: 600,

              color: "#E8621A",

            }}
          >

            ₹{food.price}

          </span>

          <span

            style={{

              fontSize: "12px",

              color: "#888",

            }}
          >

            👩‍🍳
            {" "}
            {
              food.sellerId?.name
            }

          </span>

        </div>

        {/* BUTTONS */}

        <div
          className="
            flex
            gap-2
          "
        >

          {/* DETAILS */}

          <button

            onClick={()=>
              navigate(
                `/food/${food._id}`
              )
            }

            style={{

              flex: 1,

              background: "#000",

              color: "#fff",

              border: "none",

              borderRadius: "10px",

              padding: "10px",

              fontSize: "14px",

              fontWeight: 600,

              cursor: "pointer",

            }}
          >

            View

          </button>

          {/* ADD TO CART */}

          {
            user &&
            user.role === "user" && (

              <button

                onClick={handleAdd}

                style={{

                  flex: 1,

                  background:
                    adding
                      ? "#4caf50"
                      : "#E8621A",

                  color: "#fff",

                  border: "none",

                  borderRadius: "10px",

                  padding: "10px",

                  fontSize: "14px",

                  fontWeight: 600,

                  cursor: "pointer",

                }}
              >

                {
                  adding

                    ? "✓ Added"

                    : "🛒 Add"
                }

              </button>

            )
          }

        </div>

      </div>

    </div>
  );
}

// ── Filter Chip ──────────────────────────────────────────

function FilterChip({

  label,

  emoji,

  active,

  onClick,

}) {

  return (

    <button

      onClick={onClick}

      style={{

        whiteSpace: "nowrap",

        padding: "6px 16px",

        borderRadius: "20px",

        border:
          active

            ? "1.5px solid #E8621A"

            : "1px solid #ddd",

        fontSize: "13px",

        cursor: "pointer",

        background:
          active
            ? "#E8621A"
            : "#fff",

        color:
          active
            ? "#fff"
            : "#5C3A1E",

      }}
    >

      {emoji}
      {" "}
      {label}

    </button>
  );
}

// ── MAIN HOME ────────────────────────────────────────────

export default function Home() {

  const [foods, setFoods] =
    useState([]);

  const [filtered, setFiltered] =
    useState([]);

  const [
    activeCategory,
    setActiveCategory
  ] = useState("All");

  const [
    searchQuery,
    setSearchQuery
  ] = useState("");

  const [
    loading,
    setLoading
  ] = useState(true);

  const { user } =
    useContext(AuthContext);

  // FETCH FOODS

  useEffect(() => {

    fetchFoods();

  }, []);

  const fetchFoods =
  async () => {

    try {

      const { data } =
        await API.get(
          "/foods"
        );

      setFoods(data);

      setFiltered(data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }
  };

  // FILTER

  useEffect(() => {

    let result = foods;

    // CATEGORY

    if (
      activeCategory !== "All"
    ) {

      result = result.filter(
        food =>

          food.category
          ?.toLowerCase()

          ===

          activeCategory
          .toLowerCase()
      );

    }

    // SEARCH

    if (
      searchQuery.trim()
    ) {

      result = result.filter(
        food =>

          food.title
          .toLowerCase()
          .includes(
            searchQuery
            .toLowerCase()
          )
      );

    }

    setFiltered(result);

  }, [

    foods,

    activeCategory,

    searchQuery,

  ]);

  // ADD TO CART

  const handleAddToCart =
  async (foodId) => {

    try {

      await API.post(

        "/cart/add",

        {

          foodId,

          quantity: 1,

        },

        {

          headers: {

            Authorization:
              `Bearer ${user.token}`,

          },

        }
      );

      alert(
        "Added To Cart"
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div style={S.page}>

      <Navbar />

      {/* HERO */}

      <div style={S.hero}>

        <span style={S.heroBadge}>
          🏠 Ghar Ka Khana
        </span>

        <h1 style={S.heroTitle}>

          Apni Mummy ka
          {" "}

          <span style={S.heroAccent}>
            homemade
          </span>

          <br />

          khana ab doorstep pe

        </h1>

        <p style={S.heroSub}>

          Tiffin • Cake • Sweets • Thali

        </p>

        {/* SEARCH */}

        <div
          style={{
            marginTop: "20px",
          }}
        >

          <input

            type="text"

            placeholder="
              🔍 Search food...
            "

            value={searchQuery}

            onChange={(e)=>

              setSearchQuery(
                e.target.value
              )
            }

            style={{

              width: "320px",

              padding: "12px 18px",

              borderRadius: "30px",

              border: "none",

              outline: "none",

              fontSize: "14px",

            }}
          />

        </div>

      </div>

      {/* FILTERS */}

      <div style={S.filterBar}>

        {
          CATEGORIES.map(cat => (

            <FilterChip

              key={cat.label}

              label={cat.label}

              emoji={cat.emoji}

              active={
                activeCategory ===
                cat.label
              }

              onClick={()=>

                setActiveCategory(
                  cat.label
                )
              }

            />

          ))
        }

      </div>

      {/* FOODS */}

      <div style={S.grid}>

        {
          loading

            ? (

              <div style={S.empty}>
                Loading...
              </div>

            )

            : filtered.length > 0

              ? (

                filtered.map(food => (

                  <FoodCard

                    key={food._id}

                    food={food}

                    user={user}

                    onAddToCart={
                      handleAddToCart
                    }

                  />

                ))
              )

              : (

                <div style={S.empty}>

                  No Food Found

                </div>

              )
        }

      </div>

    </div>
  );
}